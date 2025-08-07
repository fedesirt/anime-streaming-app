import React from 'react';

const HeroLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Logo grande con animación */}
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-red-500/30 transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
          
          {/* Ojo de anime grande */}
          <div className="relative w-16 h-20">
            <div className="absolute inset-0 bg-white rounded-full opacity-95 shadow-lg"></div>
            <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
            <div className="absolute top-2 left-3 w-2 h-3 bg-white rounded-full shadow-sm"></div>
          </div>
          
          {/* Ondas de streaming animadas */}
          <div className="absolute bottom-4 left-4 right-4">
            <svg width="96" height="16" viewBox="0 0 96 16" className="w-full h-4">
              <path 
                d="M 8 8 Q 16 4, 24 8 Q 32 12, 40 8 Q 48 4, 56 8 Q 64 12, 72 8 Q 80 4, 88 8" 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path 
                d="M 8 12 Q 16 8, 24 12 Q 32 16, 40 12 Q 48 8, 56 12 Q 64 16, 72 12 Q 80 8, 88 12" 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.7"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>
        </div>
        
        {/* Efecto de partículas */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Texto del logo */}
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
          AnimeZone
        </h1>
        <p className="text-xl text-gray-300 font-medium">
          Tu Portal de Anime
        </p>
      </div>
    </div>
  );
};

export default HeroLogo;
