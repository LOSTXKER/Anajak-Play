/**
 * Badge Component - Anajak Play Design System
 */

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
    
    const variants = {
      primary: 'bg-primary-neon/20 text-primary-neon border border-primary-neon/30',
      secondary: 'bg-secondary-electric/20 text-secondary-electric border border-secondary-electric/30',
      success: 'bg-status-success/20 text-status-success border border-status-success/30',
      warning: 'bg-status-warning/20 text-status-warning border border-status-warning/30',
      error: 'bg-status-error/20 text-status-error border border-status-error/30',
      info: 'bg-status-info/20 text-status-info border border-status-info/30',
      outline: 'border border-text-secondary text-text-secondary'
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-tiny',
      md: 'px-3 py-1 text-caption',
      lg: 'px-4 py-1.5 text-small'
    };
    
    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
