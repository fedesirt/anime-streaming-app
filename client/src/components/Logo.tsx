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

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const dotSizes = {
    small: 'w-1 h-1',
    medium: 'w-1.5 h-1.5',
    large: 'w-2 h-2'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icono moderno */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/25 transition-all duration-300 relative overflow-hidden`}>
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-xl"></div>
        
        {/* Icono central moderno */}
        <div className={`relative ${iconSizes[size]}`}>
          {/* Círculo principal */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-sm"></div>
          
          {/* Círculos decorativos internos */}
          <div className="absolute inset-1 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-20"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-red-600 to-red-700 rounded-full opacity-30"></div>
          
          {/* Elementos decorativos */}
          <div className={`absolute top-0.5 left-0.5 ${dotSizes[size]} bg-red-400 rounded-full opacity-70`}></div>
          <div className={`absolute top-0.5 right-0.5 ${dotSizes[size]} bg-gray-400 rounded-full opacity-70`}></div>
          <div className={`absolute bottom-0.5 left-0.5 ${dotSizes[size]} bg-red-500 rounded-full opacity-70`}></div>
          <div className={`absolute bottom-0.5 right-0.5 ${dotSizes[size]} bg-gray-500 rounded-full opacity-70`}></div>
          
          {/* Punto central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
        </div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-red-400 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-red-500 to-transparent"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-gradient-to-r from-gray-400 to-transparent"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-gradient-to-l from-gray-500 to-transparent"></div>
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
