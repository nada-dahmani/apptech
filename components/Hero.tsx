import React from 'react';
import { HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter drop-shadow-xl">
          PERFORMANCE <span className="text-red-600">ULTIME</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-8 font-light tracking-wide">
          Découvrez la prochaine génération de composants gaming. 
          Conçus pour l'excellence, forgés pour la victoire.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-sm uppercase tracking-widest hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-red-900/50">
            Acheter maintenant
          </button>
          <button className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Voir les configs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;