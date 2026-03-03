import React from 'react';
import { MYRTLE_PRODUCTS, MIST_PRODUCTS } from '../data/products';
import { useTheme } from './ThemeContext';

const ProductGrid: React.FC = () => {
  const { theme } = useTheme();
  const products = theme === 'myrtle' ? MYRTLE_PRODUCTS : MIST_PRODUCTS;

  const handleAffiliateClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="gear" className={`py-20 theme-transition ${
      theme === 'myrtle' ? 'bg-myrtle-bg' : 'bg-mist-bg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl mb-4 theme-transition ${
            theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
          }`}>
            {theme === 'myrtle' ? 'Essential Tools' : 'Ritual Artifacts'}
          </h2>
          <div className={`w-16 h-0.5 mx-auto theme-transition ${
            theme === 'myrtle' ? 'bg-myrtle-accent' : 'bg-mist-accent'
          }`}></div>
          <p className={`mt-4 max-w-2xl mx-auto theme-transition ${
            theme === 'myrtle' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {theme === 'myrtle' ? 'Our tested and approved gear for plant success.' : 'Items we use to center, clear, and connect.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-default">
              <div className={`relative aspect-[4/5] overflow-hidden mb-4 rounded-sm theme-transition ${
                theme === 'myrtle' ? 'bg-white shadow-sm' : 'bg-mist-secondary'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Affiliate Button Overlay */}
                <button 
                  onClick={(e) => handleAffiliateClick(e, product.affiliateUrl)}
                  className={`absolute bottom-4 left-4 right-4 py-3 uppercase text-xs font-bold tracking-widest opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg ${
                  theme === 'myrtle' 
                    ? 'bg-myrtle-accent text-white hover:bg-myrtle-text' 
                    : 'bg-mist-accent text-mist-bg hover:bg-white'
                }`}>
                  Check Price
                </button>
              </div>
              
              <div className="text-center">
                <p className={`text-xs uppercase tracking-wide mb-1 theme-transition ${
                  theme === 'myrtle' ? 'text-gray-500 font-bold' : 'text-mist-accent'
                }`}>{product.category}</p>
                <h3 className={`text-lg mb-1 theme-transition ${
                  theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
                }`}>
                  {product.name}
                </h3>
                <p className={`font-medium text-sm theme-transition ${
                  theme === 'myrtle' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Approx. ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xs opacity-50 mb-4">
            *We may earn a commission from links on this page.
          </p>
          <button className={`border-b pb-1 uppercase text-sm tracking-widest theme-transition ${
            theme === 'myrtle' 
              ? 'text-myrtle-text border-myrtle-text hover:text-myrtle-accent hover:border-myrtle-accent' 
              : 'text-mist-text border-mist-text hover:text-mist-accent hover:border-mist-accent'
          }`}>
            View Full Recommendations
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;