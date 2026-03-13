import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Supprimer "${name}" ?`)) {
      try {
        await deleteProduct(id);
        setRefresh(prev => prev + 1);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  //Images spécifiques par nom de produit
  const getProductImage = (productName) => {
    const productImages = {
      'Casque Bluetooth Sony WH-1000XM6': '/casque-sony.jpg',
      'Garmin Forerunner 570': '/montre-garmin.jpg',
      'Enceinte JBL Charge 5': '/enceinte-jbl.jpg',
      'Kit Haltères 20kg': '/halteres-decathlon.jpg',
      'iPhone 17 Pro Max': '/iphone.jpg',
      'Robot Aspirateur Roomba': '/robot-aspirateur.jpg',
    };

    //Si le produit existe, utilise son image locale
    if (productImages[productName]) {
      return productImages[productName];
    }

    //Image par défaut
    return '/default.jpg';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-violet-pastel">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 className="text-2xl font-medium text-white/90 mb-6 tracking-tight">
    Liste des Produits
  </h1>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-violet-pastel/20">
          <p className="text-gray-300 text-lg mb-4">Aucun produit pour le moment.</p>
          <Link 
            to="/add-product" 
            className="inline-block bg-gradient-to-r from-violet-dark to-gray-900 text-white px-6 py-3 rounded-lg hover:opacity-90 transition border-2 border-violet-pastel"
          >
            Ajouter le premier produit
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden hover:shadow-violet-pastel/50 hover:scale-105 transition-all duration-300 border border-violet-pastel/20 flex flex-col"
            >
              {/* Image du produit*/}
              <div className="h-48 overflow-hidden flex-shrink-0">
                <img 
                  src={getProductImage(product.name)} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenu */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 min-h-[3rem] line-clamp-2">{product.name}</h3>
                <p className="text-violet-pastel text-sm mb-4">{product.category}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <span> {product.reviews_count} avis</span>
                  <span>{new Date(product.created_at).toLocaleDateString('fr-FR')}</span>
                </div>

                {/* Boutons */}
                <div className="flex space-x-2 mt-auto">
                  <Link 
                    to={`/products/${product.id}`}
                    className="flex-1 bg-gradient-to-r from-violet-dark to-violet-pastel text-white text-center py-2.5 rounded-lg hover:opacity-90 transition font-semibold shadow-lg"
                  >
                    Voir détails
                  </Link>
                  <Link 
                    to={`/add-review/${product.id}`}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center py-2.5 rounded-lg hover:opacity-90 transition font-semibold shadow-lg"
                  >
                    + Avis
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="px-4 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition backdrop-blur-sm font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;