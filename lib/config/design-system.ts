/**
 * ANAJAK PLAY - DESIGN SYSTEM V2
 * Purple/Blue Neon Theme
 * Based on Masterplan V5
 */

export const colors = {
  // Primary Colors (Purple Neon)
  primary: {
    neon: '#A855F7',      // ปุ่มเด่น, แท็ก, highlight
    core: '#7C3AED',      // Card active, Hover
    violet: '#4C1D95',    // พื้นหลังเงา
  },
  
  // Secondary Blue
  secondary: {
    electric: '#3A7BFF',  // CTA, Header, Outline
    cool: '#2263E8',      // Hover
    midnight: '#111827',  // พื้นหลังลึกของ widget
  },
  
  // Dark Background Palette
  dark: {
    base: '#0A0A0D',      // พื้นหลังหลัก
    card: '#111118',      // Card ขนาดใหญ่
    surface: '#1A1A23',   // Modal / Floating layer
  },
  
  // Status Colors
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#38BDF8',
  },
  
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #3A7BFF 0%, #A855F7 100%)',
    button: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    rank: 'linear-gradient(135deg, #4F46E5 0%, #A855F7 50%, #C084FC 100%)',
    card: 'linear-gradient(180deg, rgba(168, 85, 247, 0.1) 0%, rgba(58, 123, 255, 0.05) 100%)',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    tertiary: '#71717A',
    muted: '#52525B',
  },
};

export const typography = {
  // Font Families
  fonts: {
    heading: '"Prompt", sans-serif',
    body: '"Sarabun", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  
  // Font Sizes
  sizes: {
    h1: '2.5rem',      // 40px
    h2: '2rem',        // 32px
    h3: '1.5rem',      // 24px
    h4: '1.25rem',     // 20px
    body: '0.938rem',  // 15px
    small: '0.875rem', // 14px
    caption: '0.813rem', // 13px
    tiny: '0.75rem',   // 12px
  },
  
  // Font Weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  // 8pt Spacing System
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  
  // Specific
  cardPadding: '1.5rem',
  modalPadding: '2rem',
  sectionGap: '3rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.5rem',      // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.75rem',  // 28px
  full: '9999px',
  
  // Components
  button: '0.875rem',  // 14px
  card: '1.25rem',     // 20px
  modal: '1.75rem',    // 28px
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  
  // Glow Effects
  glow: {
    purple: '0 0 20px rgba(168, 85, 247, 0.3)',
    blue: '0 0 20px rgba(58, 123, 255, 0.3)',
    subtle: '0 0 15px rgba(168, 85, 247, 0.15)',
  },
  
  // Card Shadows
  card: '0 4px 12px rgba(0, 0, 0, 0.25)',
  cardHover: '0 8px 24px rgba(168, 85, 247, 0.2)',
};

export const animation = {
  // Durations
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  
  // Easing
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Presets
  presets: {
    fadeIn: 'fadeIn 250ms ease-out',
    slideUp: 'slideUp 250ms ease-out',
    scale: 'scale 150ms ease-out',
    glow: 'glow 2s ease-in-out infinite',
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};

// Export all as default
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
};

export default designSystem;
