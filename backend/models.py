from database import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    #Relation avec les avis
    reviews = db.relationship('Review', backref='product', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,  
            'created_at': self.created_at.isoformat(),
            'reviews_count': len(self.reviews)
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)  
    sentiment = db.Column(db.String(50))  
    sentiment_score = db.Column(db.Float)  #Score de confiance 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'text': self.text,
            'rating': self.rating,
            'sentiment': self.sentiment,
            'sentiment_score': self.sentiment_score,
            'created_at': self.created_at.isoformat()
        }