#ia_sentiment.py
#Module d'analyse de sentiment avec IA (modèle multilingue)

from transformers import pipeline
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    logger.info("Chargement du modèle de sentiment multilingue...")
    sentiment_analyzer = pipeline(
        "sentiment-analysis",
        model="nlptown/bert-base-multilingual-uncased-sentiment"
    )
    logger.info("Modèle chargé avec succès !")
except Exception as e:
    logger.error(f"Erreur lors du chargement du modèle : {e}")
    sentiment_analyzer = None

def analyser_sentiment(texte, rating=None):
    """
    Analyse le sentiment d'un texte
    Si le score de confiance est trop bas (<0.3), utilise la note utilisateur comme fallback
    """
    if not sentiment_analyzer:
        return {'sentiment': 'neutre', 'score': 0.5}
    
    try:
        result = sentiment_analyzer(texte)[0]
        label = result['label']  # Format: "5 stars", "1 star"
        score = result['score']
        
        # Convertir les étoiles en sentiment
        stars = int(label.split()[0]) 
        
        if stars >= 4:
            sentiment = 'positif'
        elif stars <= 2:
            sentiment = 'négatif'
        else:
            sentiment = 'neutre'
        
        # SYSTÈME HYBRIDE : Si le modèle n'est pas sûr ET qu'on a une note utilisateur
        if score < 0.3 and rating is not None:
            logger.info(f"Score IA trop bas ({score:.2f}), utilisation de la note utilisateur {rating}/5")
            # Utiliser la note utilisateur comme fallback
            if rating >= 4:
                sentiment = 'positif'
            elif rating <= 2:
                sentiment = 'négatif'
            else:
                sentiment = 'neutre'
            score = 0.7  # Score artificiel pour indiquer qu'on utilise le fallback
        
        logger.info(f"Analyse: '{texte[:50]}...' -> {sentiment} (score: {score:.2f}, rating: {rating})")
        
        return {
            'sentiment': sentiment,
            'score': round(score, 2)
        }
    except Exception as e:
        logger.error(f"Erreur lors de l'analyse: {e}")
        # En cas d'erreur, utiliser la note utilisateur si disponible
        if rating is not None:
            if rating >= 4:
                return {'sentiment': 'positif', 'score': 0.7}
            elif rating <= 2:
                return {'sentiment': 'négatif', 'score': 0.7}
        return {'sentiment': 'neutre', 'score': 0.5}

def extraire_mots_cles_negatifs(avis_negatifs):
    """Extrait les mots-clés des avis négatifs"""
    from collections import Counter
    import re
    
    stop_words = {
        'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou',
        'mais', 'est', 'sont', 'a', 'ai', 'pas', 'plus', 'très', 'trop',
        'pour', 'dans', 'sur', 'avec', 'sans', 'ce', 'cette', 'ces',
        'mon', 'ma', 'mes', 'son', 'sa', 'ses', 'notre', 'nos', 'leur', 'leurs'
    }
    
    tous_les_mots = []
    for avis in avis_negatifs:
        mots = re.findall(r'\b[a-zàâäéèêëïîôùûüç]{3,}\b', avis.lower())
        mots = [m for m in mots if m not in stop_words]
        tous_les_mots.extend(mots)
    
    compteur = Counter(tous_les_mots)
    top_mots = compteur.most_common(5)
    
    return [mot for mot, count in top_mots]

def generer_recommandations(avis_negatifs):
    """Génère des recommandations basées sur les avis négatifs"""
    if not avis_negatifs:
        return ["Aucun avis négatif. Continuez à maintenir la qualité !"]
    
    mots_cles = extraire_mots_cles_negatifs(avis_negatifs)
    
    recommandations_map = {
        'batterie': "Améliorer l'autonomie de la batterie",
        'qualité': "Renforcer le contrôle qualité des produits",
        'livraison': "Optimiser les délais et la qualité de livraison",
        'prix': "Revoir la stratégie tarifaire",
        'service': "Améliorer le service client et le SAV",
        'emballage': "Améliorer la qualité de l'emballage",
        'notice': "Fournir une documentation plus claire",
        'fragile': "Renforcer la robustesse du produit",
        'bruit': "Réduire les nuisances sonores",
        'lourd': "Optimiser le poids du produit",
        'compliqué': "Simplifier l'utilisation",
        'cher': "Revoir le positionnement prix",
        'défaut': "Renforcer les tests qualité",
        'retard': "Améliorer la gestion des stocks",
        'nul': "Améliorer la conception générale du produit",
        'mauvais': "Renforcer la qualité globale",
        'mauvaise': "Renforcer la qualité globale",
        'cassé': "Améliorer la solidité du produit",
        'décevant': "Revoir les attentes clients et la communication produit"
    }
    
    recommandations = []
    for mot in mots_cles:
        if mot in recommandations_map:
            recommandations.append(recommandations_map[mot])
    
    if len(recommandations) < 3:
        generiques = [
            "Analyser en détail les retours clients négatifs",
            "Mettre en place un suivi qualité renforcé",
            "Améliorer la communication avec les clients"
        ]
        recommandations.extend(generiques[:3 - len(recommandations)])
    
    return recommandations[:5]