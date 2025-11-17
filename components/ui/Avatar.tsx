/**
 * Avatar Component - Anajak Play Design System
 */

import React from 'react';
import Image from 'next/image';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  frame?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  status,
  frame,
  className = '' 
}) => {
  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };
  
  const statusColors = {
    online: 'bg-status-success',
    offline: 'bg-text-tertiary',
    busy: 'bg-status-error',
    away: 'bg-status-warning'
  };
  
  const statusSize = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6'
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Frame */}
      {frame && (
        <div className="absolute inset-0 rounded-full border-2 border-primary-neon animate-glow pointer-events-none" />
      )}
      
      {/* Avatar Image */}
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-dark-surface flex items-center justify-center`}>
        {src ? (
          <Image 
            src={src} 
            alt={alt} 
            width={96} 
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-button flex items-center justify-center text-white font-bold">
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Status Indicator */}
      {status && (
        <div className={`absolute bottom-0 right-0 ${statusSize[size]} rounded-full ${statusColors[status]} border-2 border-dark-card`} />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
