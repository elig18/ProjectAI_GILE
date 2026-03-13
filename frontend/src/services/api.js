import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PRODUITS
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// AVIS
export const getReviews = (productId) => api.get(`/products/${productId}/reviews`);
export const createReview = (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// STATS & RECOMMANDATIONS
export const getProductStats = (productId) => api.get(`/products/${productId}/stats`);
export const getRecommendations = (productId) => api.get(`/products/${productId}/recommendations`);

export default api;