import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import AddReview from './pages/AddReview';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        {/* Bandeau  */}
        <Banner />

        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-review/:id" element={<AddReview />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;