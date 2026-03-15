from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from models import Product, Review
from ia_sentiment import analyser_sentiment, generer_recommandations
import os

app = Flask(__name__)
CORS(app)

#configuration du chemin 
basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, 'instance')

if not os.path.exists(instance_path):
    os.makedirs(instance_path)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(instance_path, 'products.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

#initialisation 
def init_db():
    with app.app_context():
        print("Vérification de la base de données...")
        db.create_all()

        if Product.query.count() == 0:
            print("Base vide ! Ajout des 6 produits avec les bons noms pour les images...")
            produits = [
                Product(name="Casque Bluetooth Sony WH-1000XM6", category="Audio"),
                Product(name="Garmin Forerunner 570", category="Sport"),
                Product(name="Enceinte JBL Charge 5", category="Audio"),
                Product(name="iPhone 17 Pro Max", category="Mobile"),
                Product(name="Robot Aspirateur Roomba", category="Maison"),
                Product(name="Kit Haltères 20kg", category="Sport")
            ]
            db.session.add_all(produits)
            db.session.commit()

            #Avis de test pour le premier produit (Sony)
            avis_test = [
                Review(product_id=1, text="Excellent casque, son de qualité et batterie longue durée !", rating=5),
                Review(product_id=1, text="Déçu par la qualité du micro et le prix trop élevé.", rating=2),
                Review(product_id=1, text="Bon produit dans l'ensemble, manque juste un étui de transport.", rating=4)
            ]

            for avis in avis_test:
                print(f"Tentative analyse IA pour : {avis.text[:30]}...") 
                try:
                    #On essaie l'IA
                    result = analyser_sentiment(avis.text)
                    avis.sentiment = result['sentiment']
                    avis.sentiment_score = result['score']
                except Exception as e:
                    #Si fonctionne pas : on affiche
                    print(f"L'IA a mis trop de temps ou a crashé, saut de l'analyse : {e}")
                    avis.sentiment = "neutre"
                    avis.sentiment_score = 0.5
                
                db.session.add(avis)

            db.session.commit()
            print("Base de données prête et synchronisée avec le Frontend !")
        else:
            print("La base de données contient déjà des produits.")

#route produits
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(name=data['name'], category=data['category'], description=data.get('description'))
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

#avis et statistiques
@app.route('/api/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).order_by(Review.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reviews])

@app.route('/api/products/<int:product_id>/stats', methods=['GET'])
def get_product_stats(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    if not reviews:
        return jsonify({'total_reviews': 0, 'average_rating': 0, 'sentiment_distribution': {'positif': 0, 'neutre': 0, 'négatif': 0}})
    
    avg = sum(r.rating for r in reviews) / len(reviews)
    dist = {
        'positif': sum(1 for r in reviews if r.sentiment == 'positif'),
        'neutre': sum(1 for r in reviews if r.sentiment == 'neutre'),
        'négatif': sum(1 for r in reviews if r.sentiment == 'négatif')
    }
    return jsonify({'total_reviews': len(reviews), 'average_rating': round(avg, 2), 'sentiment_distribution': dist})

@app.route('/api/products/<int:product_id>/recommendations', methods=['GET'])
def get_recommendations(product_id):
    avis_negatifs = Review.query.filter_by(product_id=product_id, sentiment='négatif').all()
    recommandations = generer_recommandations([a.text for a in avis_negatifs])
    return jsonify({'recommendations': recommandations})

@app.route('/')
def home():
    return jsonify({"message": "Backend actif", "status": "online"})

#Lancement
if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)