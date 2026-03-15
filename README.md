# Projet AI Advisor pour entreprise e-commerce Cherry 🍒

# Cherry reviews.io

Cherry reviews.io est une application web permettant d’analyser automatiquement les avis clients de l'entreprise e-commerce Cherry afin d’aider les équipes produit à comprendre les retours utilisateurs et prioriser les améliorations.

L'application centralise les avis clients, analyse leur sentiment grâce à un modèle d’intelligence artificielle et génère des recommandations d'amélioration basées sur les retours négatifs.

---

# Contexte du projet

Dans une entreprise e-commerce, les équipes produit doivent analyser des centaines d’avis clients afin de comprendre :

- ce que les clients apprécient
- ce qui pose problème
- quelles améliorations doivent être prioritaires

Ce processus est souvent long et manuel.

L’objectif de ce projet est donc de créer une application web qui :

- centralise les avis clients
- analyse automatiquement leur sentiment grâce à l’IA
- génère des recommandations d’amélioration

# Technologies utilisées

Frontend :
- React
- Vite
- Tailwind CSS
- Axios
- Chart.js / Recharts

Backend :
- Python
- Flask
- Flask-CORS
- SQLAlchemy

IA / NLP :
- Hugging Face Transformers
- Modèle : nlptown/bert-base-multilingual-uncased-sentiment

Base de données :
- SQLite


# Structure du projet
PROJECTAI_GILE/
├── backend/
│   ├── app.py                
│   ├── database.py           
│   ├── models.py            
│   ├── seed.py               
│   ├── requirements.txt      
│   ├── instance/             
│   └── __pycache__/          
│
├── frontend/
│   ├── public/              
│   │   ├── bot.png
│   │   ├── cherrylogo.png
│   │   ├── images produits
│   │   └── README.md        
│   ├── src/
│   │   ├── assets/           
│   │   ├── components/       
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SentimentChart.jsx
│   │   ├── pages/            
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AddReview.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductList.jsx
│   │   ├── services/         
│   │   │   └── api.js
│   │   ├── App.jsx           
│   │   ├── App.css           
│   │   ├── index.css        
│   │   └── main.jsx          
│   ├── tailwind.config.js    
│   ├── vite.config.js        
│   └── .gitignore            
│
└── README.md                 


---
# Installation du projet
Aller dans votre terminal de VScode 

## Cloner le projet

```bash
git clone https://github.com/elig18/ProjectAI_GILE.git
cd ProjectAI_GILE
```

##  Backend 

**1. Se placer dans le dossier backend :**
```bash
cd backend
```

**2. Créer un environnement virtuel(optionnel):**
```bash
python -m venv venv
```
Activer l'environnement: 
- Windows
```bash
venv\Scripts\activate
```

**3. Installer les dépendances:**
```bash
pip install -r requirements.txt
```

**4. Lancer serveur backend :"**
```python
python app.py
```
Observer le terminal, exemple vous verrez "6 produits ajouté"

## Frontend

**1. Ouvrir un nouveau terminal et se placer dans le dossier frontend:**
```bash
cd frontend
```

**2. Installer dépendances:**
```bash
npm install
```

**3. Lancer l'application:**
```bash
npm run dev
```
Observer le terminal, ctrl+clic sur votre lien localhost 

Merci d'être arrivé jusqu'à la mais maintenant vous pouvez : 

- Ajouter un produit
- Ajouter des avis clients
- Etudier l’IA analyse automatiquement le sentiment
- Consulter les statistiques et recommandations

🍒 1er site d'une entreprise fictive faite par Elisabeth GIL dans le cadre de formation - Mars 2026 

[*Vidéo version 1(j'ai corrigé le beug d'ajout d'avis)*](https://drive.google.com/file/d/1mij8JcZJxR9GP0c0QwsduKuXoH4y9OKg/view?usp=sharing)

Ce n'est pas parfait, a pour but pédagogique

