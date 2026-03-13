#Script d'initialisation de la base de données avec données de test

from app import app, db
from models import Product, Review
from ia_sentiment import analyser_sentiment

def init_database():
    """Initialise la base de données avec des produits et avis de test"""
    
    with app.app_context():
        #Supprimer toutes les données existantes
        print("Suppression des données existantes...")
        Review.query.delete()
        Product.query.delete()
        db.session.commit()
        
        #Créer des produits
        print("Création des produits...")
        produits = [
            Product(
                name="Casque Bluetooth Sony WH-1000XM6", 
                category="Audio",
                description="Casque sans fil à réduction de bruit active, autonomie 30h, qualité audio premium. Utilisation de la toute dernière technologie. Prix 449€"
            ),
            Product(
                name="Garmin Forerunner 570", 
                category="Sport",
                description="Montre GPS multisport avec cardio au poignet, autonomie environ 2 semaines et elle offre un suivi complet de votre forme grâce à des analyses détaillées et des plans d'entraînement personnalisés. Prix 549€"
            ),
            Product(
                name="Enceinte JBL Charge 5", 
                category="Audio",
                description="Enceinte Bluetooth portable au design audacieux, la JBL Charge 5 délivre un son puissant de 40W avec des graves profonds grâce à ses haut-parleurs séparés. Totalement étanche (IP67) et offrant 20 heures d'autonomie avec port USB de recharge, elle vous suit partout tout en permettant de connecter plusieurs enceintes en mode PartyBoost. Prix 199,99€"
            ),
            Product(
                name="Kit Haltères 20kg", 
                category="Sport",
                description="Facile à ranger et à transporter grâce à sa valise, ce kit haltères comprend 2 barres courtes et 12 poids (8x1kg + 4x2 kg). Sécurité assurée avec les barres filetées et ses poids tenus par un écrou. Prix 49.99€"
            ),
            Product(
                name="iPhone 17 Pro Max", 
                category="Électronique",
                description="Smartphone Apple iPhone17 Pro Max, écran 6.9\" OLED, triple caméra 48MP, 256Go, batterie longue durée. Personnisable. Prix 1479€"
            ),
            Product(
                name="Robot Aspirateur Roomba", 
                category="Maison",
                description="Robot aspirateur, navigation intelligente, aspiration puissante, autonome, ne tombe pas dans les escaliers, configuration fluide.Prix 285€"
            ),
        ]
        
        for p in produits:
            db.session.add(p)
        
        db.session.commit()
        print(f"✅ {len(produits)} produits créés")
        
        #Créer des avis de test avec analyse IA
        print("Création des avis avec analyse IA...")
        
        avis_data = [
            #Casque Bluetooth Sony WH-1000XM6
            (1, "Excellent casque, son de qualité exceptionnelle et batterie longue durée !", 5),
            (1, "Très bon produit, confortable pour de longues sessions.", 4),
            (1, "Déçu par la qualité du micro et le prix trop élevé.", 2),
            (1, "Le casque ne se connecte pas bien, beaucoup de coupures.", 1),
            
            #garmin Forerunner 570
            (2, "Parfaite pour le sport, précise et résistante à l'eau.", 5),
            (2, "La batterie ne tient pas assez longtemps, décevant.", 2),
            (2, "Interface intuitive, excellente pour le suivi fitness.", 5),
            (2, "GPS très précis, idéal pour la course à pied !", 5),
            (2, "Un peu compliquée à configurer au début mais top ensuite.", 4),
            
            #Enceinte JBL Charge 5
            (3, "Son puissant et clair, parfaite pour les soirées.", 5),
            (3, "Bonne autonomie mais un peu lourde à transporter.", 4),
            (3, "Déçu, le son grésille à fort volume.", 2),
            
            #Kit Haltères 20kg
            (4, "Très bonne qualité, revêtement antidérapant parfait !", 5),
            (4, "Bon rapport qualité-prix pour débuter la musculation.", 4),
            (4, "Les vis se desserrent rapidement, un peu frustrant.", 3),
            
            #iPhone 17 Pro Max
            (5, "Meilleur smartphone que j'ai eu, rapide et bel écran.", 5),
            (5, "Caméra impressionnante mais prix excessif.", 3),
            (5, "Problème de surchauffe lors de jeux intensifs.", 2),
            
            #Robot Aspirateur Roomba
            (6, "Efficace et silencieux, gain de temps incroyable.", 5),
            (6, "Se bloque souvent sur les tapis épais.", 3),
            (6, "Parfait pour nettoyer tous les jours automatiquement.", 5),
        ]
        
        avis_crees = 0
        for product_id, texte, note in avis_data:
            #Analyse du sentiment
            result = analyser_sentiment(texte, note)
            
            avis = Review(
                product_id=product_id,
                text=texte,
                rating=note,
                sentiment=result['sentiment'],
                sentiment_score=result['score']
            )
            db.session.add(avis)
            avis_crees += 1
            print(f"  └─ Avis {avis_crees}: {texte[:40]}... → {result['sentiment']}")
        
        db.session.commit()
        print(f"✅ {avis_crees} avis créés avec analyse IA")
        
        # Afficher un résumé
        print("\n" + "="*50)
        print("BASE DE DONNÉES INITIALISÉE AVEC SUCCÈS !")
        print("="*50)
        print(f"📦 {Product.query.count()} produits")
        print(f"💬 {Review.query.count()} avis")
        print(f"😊 {Review.query.filter_by(sentiment='positif').count()} avis positifs")
        print(f"😐 {Review.query.filter_by(sentiment='neutre').count()} avis neutres")
        print(f"😞 {Review.query.filter_by(sentiment='négatif').count()} avis négatifs")
        print("="*50)

if __name__ == '__main__':
    print("Initialisation de la base de données...")
    init_database()
    print("\n Terminé ! Vous pouvez maintenant lancer l'application avec : python app.py")