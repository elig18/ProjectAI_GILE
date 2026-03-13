import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, getReviews, getProductStats, getRecommendations } from '../services/api';
import SentimentChart from '../components/SentimentChart';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [prodRes, reviewsRes, statsRes, recRes] = await Promise.all([
          getProduct(id),
          getReviews(id),
          getProductStats(id),
          getRecommendations(id)
        ]);

        setProduct(prodRes.data);
        setReviews(reviewsRes.data);
        setStats(statsRes.data);
        setRecommendations(recRes.data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const getSentimentBadge = (sentiment) => {
    const configs = {
      positif: { color: 'bg-green-500', label: 'Positif' },
      négatif: { color: 'bg-red-500', label: 'Négatif' },
      neutre: { color: 'bg-gray-400', label: 'Neutre' }
    };
    const config = configs[sentiment] || { color: 'bg-gray-300', label: 'Inconnu' };
    
    return (
      <span className="inline-flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${config.color}`}></span>
        <span>{config.label}</span>
      </span>
    );
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-2xl text-violet-pastel animate-pulse">Chargement des analyses...</div></div>;
  if (!product) return <div className="text-center py-12"><p className="text-xl text-gray-300">Produit introuvable</p></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER PRODUIT */}
      <div className="bg-gradient-to-r from-violet-dark/80 to-indigo-600/80 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-violet-pastel/30">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-white hover:text-violet-pastel font-semibold text-lg transition-colors flex items-center gap-2"
        >
          ← Retour au catalogue
        </button>
        <h1 className="text-5xl font-bold text-white mb-3">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-200 text-sm font-bold uppercase tracking-wider">
            Catégorie : {product.category}
          </span>
        </div>
        {product.description && (
          <p className="text-gray-100 text-lg leading-relaxed bg-black/20 p-5 rounded-xl border border-white/10 shadow-inner">
            {product.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* BOUTON AJOUTER AVIS */}
          <Link 
            to={`/add-review/${id}`}
            className="group relative block w-full bg-gradient-to-r from-indigo-600 to-violet-600 p-1 rounded-2xl transition-all hover:scale-[1.01] active:scale-95 shadow-xl"
          >
            <div className="bg-gray-900 group-hover:bg-transparent transition-colors rounded-[14px] py-4 text-center">
               <span className="text-white font-bold text-lg">→ Rédiger un avis client</span>
            </div>
          </Link>

          {/* SECTION IA */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white border-2 border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <img src="/bot.png" alt="Assistant IA" className="w-12 h-12 drop-shadow-lg" />
                <h2 className="text-xl font-bold">Cherry AI Advisor </h2>
              </div>
              
              {recommendations.length === 0 ? (
                <p className="text-white/70 text-sm italic bg-black/10 p-4 rounded-lg">L'IA attend plus d'avis pour générer des recommandations pertinentes.</p>
              ) : (
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                      <span className="bg-white text-violet-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{index + 1}</span>
                      <p className="text-sm leading-snug">{rec}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* LISTE DES AVIS */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
               Avis clients <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-500">{reviews.length}</span>
            </h2>

            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-gray-50/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-yellow-500 font-bold tracking-widest">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                        <div className="text-sm font-medium text-gray-600">{getSentimentBadge(review.sentiment)}</div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{new Date(review.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*Stats*/}
        <div className="space-y-6">
          {stats && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Analyse des données</h2>
              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div className="bg-violet-50 p-3 rounded-xl">
                    <p className="text-xs text-violet-600 uppercase font-bold">Moyenne</p>
                    <p className="text-xl font-black text-violet-900">{stats.average_rating}/5</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                    <p className="text-xl font-black text-gray-900">{stats.total_reviews}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Répartition des sentiments</h3>
                <SentimentChart sentimentDistribution={stats.sentiment_distribution} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;