import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-red-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 brand-font line-clamp-1 group-hover:text-red-500 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs.slice(0, 2).map((spec, index) => (
            <span key={index} className="text-[10px] uppercase tracking-wider bg-neutral-700/50 text-neutral-400 px-2 py-1 rounded">
              {spec}
            </span>
          ))}
        </div>

        <p className="text-sm text-neutral-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-700">
          <span className="text-xl font-bold text-white">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition-all duration-200 active:scale-95"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;