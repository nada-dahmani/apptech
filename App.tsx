import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIChatbot from './components/AIChatbot';
import { PRODUCTS } from './constants';
import { Category, Product, CartItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Filter Logic
  const filteredProducts = selectedCategory === Category.ALL
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((a, c) => a + c.quantity, 0)} 
        toggleCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        <Hero />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white brand-font mb-6 md:mb-0">
              Nos <span className="text-red-600">Produits</span>
            </h2>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-900/40'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-red-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="text-center py-20">
               <p className="text-neutral-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
             </div>
          )}
        </section>
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500">
          <p className="brand-font text-white text-xl font-bold mb-4">CYBER<span className="text-red-600">TECH</span></p>
          <p>© 2024 CyberTech Store. Tous droits réservés.</p>
          <p className="text-sm mt-2">Designed by AI.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      <AIChatbot products={PRODUCTS} />
    </div>
  );
}

export default App;