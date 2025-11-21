import React from 'react';
import { CartItem } from '../types';
import { XIcon, TrashIcon } from './Icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-neutral-900 border-l border-neutral-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
            <h2 className="text-xl font-bold text-white brand-font">Mon Panier</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-white transition">
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
                  <XIcon className="w-8 h-8 opacity-50" />
                </div>
                <p>Votre panier est vide.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-neutral-800/50 p-3 rounded-lg border border-neutral-800">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-neutral-700" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-white font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-red-500 text-sm font-bold">
                        {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 bg-neutral-900 rounded border border-neutral-700">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition"
                        >
                          -
                        </button>
                        <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-500 transition"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-800 bg-neutral-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-neutral-400">Total</span>
              <span className="text-2xl font-bold text-white brand-font">
                {total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <button 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;