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

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icono */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/25 transition-all duration-300 relative overflow-hidden`}>
        {/* Ojo de anime */}
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 bg-white rounded-full opacity-90"></div>
          <div className="absolute inset-1 bg-gray-800 rounded-full"></div>
          <div className="absolute top-1 left-1.5 w-1 h-1.5 bg-white rounded-full"></div>
        </div>
        
        {/* Ondas de streaming */}
        <div className="absolute bottom-1 left-1 right-1">
          <svg width="24" height="8" viewBox="0 0 24 8" className="w-full h-2">
            <path 
              d="M 2 4 Q 4 2, 6 4 Q 8 6, 10 4 Q 12 2, 14 4 Q 16 6, 18 4 Q 20 2, 22 4" 
              stroke="white" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M 2 6 Q 4 4, 6 6 Q 8 8, 10 6 Q 12 4, 14 6 Q 16 8, 18 6 Q 20 4, 22 6" 
              stroke="white" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Texto del logo */}
      {showText && (
        <span className={`text-white font-bold ${textSizes[size]} bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}>
          AnimeZone
        </span>
      )}
    </div>
  );
};

export default Logo;
