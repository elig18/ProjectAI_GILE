import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      await createProduct({
        name,
        category,
        description
      });

      alert('Produit ajouté avec succès !');
      navigate('/');
    } catch (error) {
      console.error('Erreur:', error);
      alert("❌ Erreur lors de l'ajout");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold text-white mb-6">
        Ajouter un Produit
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-violet-pastel/40"
      >

        {/* NOM PRODUIT */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Nom du produit
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Télévision 4K"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-dark focus:outline-none transition"
            required
          />
        </div>

        {/* CATEGORIE */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Catégorie
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-dark focus:outline-none transition"
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            <option value="Audio">Audio</option>
            <option value="Sport">Sport</option>
            <option value="Maison">Maison</option>
            <option value="Électronique">Électronique</option>
            <option value="Fitness">Fitness</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement le produit..."
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-dark focus:outline-none transition"
          />
        </div>

    

        {/* BOUTONS */}
        <div className="flex space-x-4">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl hover:scale-105 hover:shadow-xl transition font-bold text-lg border-2 border-violet-400 disabled:opacity-50"
          >
            {loading ? 'Ajout en cours...' : 'Ajouter le produit'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            Annuler
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddProduct;