import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };

  const eyeSizes = {
    small: 'w-4 h-5',
    medium: 'w-5 h-6',
    large: 'w-6 h-7'
  };

  const pupilSizes = {
    small: 'inset-1',
    medium: 'inset-1.5',
    large: 'inset-2'
  };

  const irisSizes = {
    small: 'inset-0.5',
    medium: 'inset-1',
    large: 'inset-1.5'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icono */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/25 transition-all duration-300 relative overflow-hidden`}>
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-xl"></div>
        
        {/* Ojo de anime realista */}
        <div className={`relative ${eyeSizes[size]}`}>
          {/* Sombra interna del ojo */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-100/80 rounded-full shadow-inner"></div>
          
          {/* Ojo principal con gradiente */}
          <div className="absolute inset-1 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-sm"></div>
          
          {/* Iris con gradiente realista */}
          <div className={`absolute ${irisSizes[size]} bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full shadow-inner`}></div>
          
          {/* Pupila con profundidad */}
          <div className={`absolute ${pupilSizes[size]} bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner`}></div>
          
          {/* Reflejo principal del ojo */}
          <div className="absolute top-1 left-1.5 w-1.5 h-2 bg-white rounded-full opacity-90"></div>
          
          {/* Reflejo secundario */}
          <div className="absolute top-0.5 left-2.5 w-0.8 h-1.2 bg-white rounded-full opacity-70"></div>
          
          {/* Reflejo terciario */}
          <div className="absolute top-2 left-1 w-0.6 h-0.8 bg-white rounded-full opacity-50"></div>
        </div>
        
        {/* Pestañas superiores */}
        <div className="absolute top-1 left-1 right-1">
          <svg width="32" height="4" viewBox="0 0 32 4" className="w-full h-1">
            <path 
              d="M 2 2 Q 6 1, 10 2 Q 14 3, 18 2 Q 22 1, 26 2 Q 30 3, 34 2" 
              stroke="#1f2937" 
              strokeWidth="1" 
              fill="none" 
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>
        
        {/* Pestañas inferiores */}
        <div className="absolute bottom-1 left-1 right-1">
          <svg width="32" height="4" viewBox="0 0 32 4" className="w-full h-1">
            <path 
              d="M 2 2 Q 6 3, 10 2 Q 14 1, 18 2 Q 22 3, 26 2 Q 30 1, 34 2" 
              stroke="#1f2937" 
              strokeWidth="0.8" 
              fill="none" 
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
        
        {/* Ondas de streaming mejoradas */}
        <div className="absolute bottom-1 left-1 right-1">
          <svg width="32" height="6" viewBox="0 0 32 6" className="w-full h-1.5">
            <path 
              d="M 2 3 Q 6 1, 10 3 Q 14 5, 18 3 Q 22 1, 26 3 Q 30 5, 34 3" 
              stroke="white" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round"
              opacity="0.9"
            />
            <path 
              d="M 2 4.5 Q 6 2.5, 10 4.5 Q 14 6.5, 18 4.5 Q 22 2.5, 26 4.5 Q 30 6.5, 34 4.5" 
              stroke="white" 
              strokeWidth="1" 
              fill="none" 
              strokeLinecap="round" 
              opacity="0.7"
            />
          </svg>
        </div>
        
        {/* Efecto de brillo en el borde */}
        <div className="absolute inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
      </div>

      {/* Texto del logo */}
      {showText && (
        <span className={`text-white font-bold ${textSizes[size]} bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-sm`}>
          AnimeZone
        </span>
      )}
    </div>
  );
};

export default Logo;
