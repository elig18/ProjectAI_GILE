import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full flex justify-center pt-6 pb-4">
      <nav className="w-11/12 max-w-7xl bg-gradient-to-r from-gray-900/90 to-violet-dark/90 backdrop-blur-lg shadow-2xl rounded-full px-8 py-4 flex items-center justify-between border border-violet-pastel/20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex items-center space-x-3">
            <img 
              src="/cherrylogo.png" 
              alt="logo"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-extrabold text-white text-2xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              CHERRY<span style={{ fontFamily: "'Baskerville', serif" }} className="italic text-violet-pastel ml-1">reviews.io</span>
            </span>
          </div>
        </Link>

        {/* Menu et contact */}
        <div className="hidden md:flex gap-10 text-gray-200 font-medium items-center">
          <Link 
            to="/" 
            className="hover:text-violet-pastel transition-colors duration-200 cursor-pointer"
          >
            Catalogue 
          </Link>
          
          <Link 
            to="/contact" 
            className="hover:text-violet-pastel transition-colors duration-200 cursor-pointer"
          >
            Contact
          </Link>
        </div>

        {/* Bouton */}
        <Link 
          to="/add-product"
          className="group relative inline-block"
        >
          <span className="absolute inset-0 translate-x-0 translate-y-0 bg-violet-pastel transition-transform group-hover:translate-x-1 group-hover:translate-y-1 rounded-full"></span>
          <span className="relative block border-2 border-violet-pastel bg-gradient-to-r from-violet-dark to-gray-900 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            + Nouveau Produit
          </span>
        </Link>

      </nav>
    </div>
  );
}

export default Navbar;