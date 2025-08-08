import React from 'react';

const HeroLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Logo grande con animación */}
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-red-500/30 transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
          {/* Efecto de brillo mejorado */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-red-400/20 to-transparent rounded-3xl"></div>
          
          {/* Ojo de anime realista */}
          <div className="relative w-20 h-24">
            {/* Sombra interna del ojo */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-100/80 rounded-full shadow-inner"></div>
            
            {/* Ojo principal con gradiente */}
            <div className="absolute inset-2 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-lg"></div>
            
            {/* Iris con gradiente realista */}
            <div className="absolute inset-4 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full shadow-inner"></div>
            
            {/* Pupila con profundidad */}
            <div className="absolute inset-6 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner"></div>
            
            {/* Reflejo principal del ojo */}
            <div className="absolute top-3 left-4 w-4 h-5 bg-white rounded-full opacity-90 shadow-sm"></div>
            
            {/* Reflejo secundario */}
            <div className="absolute top-2 left-6 w-2 h-3 bg-white rounded-full opacity-70"></div>
            
            {/* Reflejo terciario */}
            <div className="absolute top-5 left-3 w-1.5 h-2 bg-white rounded-full opacity-50"></div>
            
            {/* Reflejo cuaternario */}
            <div className="absolute top-4 right-4 w-1 h-1.5 bg-white rounded-full opacity-40"></div>
          </div>
          
          {/* Pestañas superiores */}
          <div className="absolute top-8 left-4 right-4">
            <svg width="96" height="8" viewBox="0 0 96 8" className="w-full h-2">
              <path 
                d="M 4 4 Q 12 2, 20 4 Q 28 6, 36 4 Q 44 2, 52 4 Q 60 6, 68 4 Q 76 2, 84 4 Q 92 6, 100 4" 
                stroke="#1f2937" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
                opacity="0.8"
              />
              <path 
                d="M 4 5 Q 12 3, 20 5 Q 28 7, 36 5 Q 44 3, 52 5 Q 60 7, 68 5 Q 76 3, 84 5 Q 92 7, 100 5" 
                stroke="#1f2937" 
                strokeWidth="1.5" 
                fill="none" 
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
          
          {/* Pestañas inferiores */}
          <div className="absolute bottom-8 left-4 right-4">
            <svg width="96" height="8" viewBox="0 0 96 8" className="w-full h-2">
              <path 
                d="M 4 4 Q 12 6, 20 4 Q 28 2, 36 4 Q 44 6, 52 4 Q 60 2, 68 4 Q 76 6, 84 4 Q 92 2, 100 4" 
                stroke="#1f2937" 
                strokeWidth="1.5" 
                fill="none" 
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
          
          {/* Ondas de streaming animadas mejoradas */}
          <div className="absolute bottom-4 left-4 right-4">
            <svg width="96" height="16" viewBox="0 0 96 16" className="w-full h-4">
              <path 
                d="M 8 8 Q 16 4, 24 8 Q 32 12, 40 8 Q 48 4, 56 8 Q 64 12, 72 8 Q 80 4, 88 8" 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
                className="animate-pulse"
                opacity="0.9"
              />
              <path 
                d="M 8 12 Q 16 8, 24 12 Q 32 16, 40 12 Q 48 8, 56 12 Q 64 16, 72 12 Q 80 8, 88 12" 
                stroke="white" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.7"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              <path 
                d="M 8 15 Q 16 11, 24 15 Q 32 19, 40 15 Q 48 11, 56 15 Q 64 19, 72 15 Q 80 11, 88 15" 
                stroke="white" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </svg>
          </div>
          
          {/* Efecto de brillo en el borde */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
        </div>
        
        {/* Efectos de partículas mejorados */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Texto del logo mejorado */}
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
