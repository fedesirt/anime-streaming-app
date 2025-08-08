import React from 'react';

const HeroLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Logo grande con diseño moderno */}
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
          {/* Efectos de brillo modernos */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-3xl"></div>
          
          {/* Icono central moderno */}
          <div className="relative w-20 h-20">
            {/* Círculo principal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-lg"></div>
            
            {/* Círculos decorativos internos */}
            <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-30"></div>
            
            {/* Elementos decorativos */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 rounded-full opacity-70"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-pink-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-purple-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-indigo-400 rounded-full opacity-70"></div>
            
            {/* Punto central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-sm"></div>
            
            {/* Líneas decorativas */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-pink-400 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-purple-400 to-transparent"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gradient-to-l from-indigo-400 to-transparent"></div>
            </div>
          </div>
          
          {/* Elementos decorativos flotantes */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Efecto de brillo en el borde */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
        </div>
        
        {/* Efectos de partículas modernas */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Texto del logo moderno */}
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          AnimeZone
        </h1>
        <p className="text-xl text-gray-300 font-medium drop-shadow-md">
          Tu Portal de Anime
        </p>
      </div>
    </div>
  );
};

export default HeroLogo;
