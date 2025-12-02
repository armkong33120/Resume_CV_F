import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // iPad specific
      'ipad': '768px',
      'ipad-pro': '1024px',
    },
    extend: {
      maxWidth: {
        container: '1120px',
      },
      spacing: {
        'safe-top': 'var(--safe-area-inset-top)',
        'safe-right': 'var(--safe-area-inset-right)',
        'safe-bottom': 'var(--safe-area-inset-bottom)',
        'safe-left': 'var(--safe-area-inset-left)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.03em',
      },
      colors: {
        background: '#ffffff',
        foreground: '#1d1d1f',
        border: 'rgba(0, 0, 0, 0.1)',
        glass: 'rgba(255, 255, 255, 0.8)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'hover': '0 12px 40px 0 rgba(0, 0, 0, 0.12)',
      },
      transitionProperty: {
        'all': 'all',
      },
    },
  },
  plugins: [],
};

export default config;

