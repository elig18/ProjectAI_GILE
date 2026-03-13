// src/pages/AddReview.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createReview } from '../services/api';

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      alert('Veuillez écrire un avis');
      return;
    }

    try {
      await createReview(id, { text: reviewText, rating });
      alert('Avis ajouté, merci!');
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'ajout');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-2xl text-violet-pastel">Chargement...</div></div>;
  }

  if (!product) {
    return <div className="text-center py-12"><p className="text-xl text-gray-300">Produit introuvable</p></div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-violet-dark/80 to-indigo-600/80 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-violet-pastel/30">
        <button
          onClick={() => navigate(`/products/${id}`)}
          className="mb-4 text-white hover:text-violet-pastel font-semibold text-lg transition-colors"
        >
          ← Retour au produit
        </button>
        <h1 className="text-4xl font-bold text-white mb-3">Ajouter un avis</h1>
        <p className="text-xl text-violet-pastel">{product.name}</p>
      </div>

      {/* Formulaire */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-violet-pastel/40">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Note (1 à 5 étoiles)</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-dark focus:outline-none text-lg"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{'⭐'.repeat(n)} ({n}/5)</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Votre avis</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Décrivez votre expérience avec ce produit..."
              rows="8"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-dark focus:outline-none resize-none text-lg"
              required
            />
            <p className="text-sm text-gray-500 mt-2 italic">
              💡 Votre avis sera automatiquement analysé par notre IA pour étude marketing
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-dark to-indigo-600 text-white py-4 rounded-lg hover:opacity-90 transition font-semibold text-lg shadow-lg"
            >
              → Publier mon avis
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/products/${id}`)}
              className="px-8 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReview;