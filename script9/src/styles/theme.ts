import { Space_Grotesk } from 'next/font/google';
import { Inter } from 'next/font/google';

// Font configuration
export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    weight: ['300', '400', '500'],
});

// Brand colors
export const colors = {
    primary: '#B502CE', // Script9 Magenta
    white: '#FFFFFF',
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
};

// Typography scale
export const typography = {
    h1: 'text-4xl font-space-grotesk font-bold tracking-tight',
    h2: 'text-3xl font-space-grotesk font-semibold tracking-tight',
    h3: 'text-2xl font-space-grotesk font-semibold',
    h4: 'text-xl font-space-grotesk font-semibold',
    body: 'text-base font-inter font-normal',
    bodyLarge: 'text-lg font-inter font-normal',
    bodySmall: 'text-sm font-inter font-normal',
    caption: 'text-xs font-inter font-medium',
};

// Spacing system
export const spacing = {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
};

// Shadows
export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

// Border radius
export const radius = {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
};

// Z-index scale
export const zIndex = {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
};

// Transitions
export const transitions = {
    base: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
};
