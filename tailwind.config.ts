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
      keyframes: {
        'cyber-loader-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'cyber-loader-fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
        },
        'cyber-loader-glitch': {
          '0%, 100%': { transform: 'translate(0, 0)', filter: 'none' },
          '18%': { transform: 'translate(-1px, 0)', filter: 'contrast(1.08)' },
          '20%': { transform: 'translate(1px, -1px)' },
          '22%': { transform: 'translate(0, 0)', filter: 'none' },
          '62%': { transform: 'translate(1px, 0)' },
          '64%': { transform: 'translate(-1px, 1px)', filter: 'contrast(1.06)' },
          '66%': { transform: 'translate(0, 0)', filter: 'none' },
        },
        'cyber-loader-scan': {
          '0%': { transform: 'translateY(-120%)', opacity: '0' },
          '12%': { opacity: '0.8' },
          '88%': { opacity: '0.8' },
          '100%': { transform: 'translateY(120%)', opacity: '0' },
        },
        'cyber-loader-grid': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(32px, 32px, 0)' },
        },
        'cyber-loader-progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'cyber-suit-resolve': {
          '0%': {
            opacity: '0.28',
            transform: 'translate3d(0, 18px, 0) scale(0.985)',
            filter: 'blur(12px) grayscale(1) contrast(0.9)',
          },
          '18%': {
            opacity: '0.58',
            transform: 'translate3d(0, 10px, 0) scale(0.992)',
            filter: 'blur(7px) grayscale(1) contrast(1)',
          },
          '38%': {
            opacity: '0.9',
            transform: 'translate3d(0, 2px, 0) scale(1)',
            filter: 'blur(2px) grayscale(1) contrast(1.08)',
          },
          '52%, 78%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0) grayscale(1) contrast(1.12)',
          },
          '84%': {
            opacity: '0.95',
            transform: 'translate3d(1px, 0, 0) scale(1.002)',
            filter: 'blur(0.5px) grayscale(1) contrast(1.22)',
          },
          '88%': {
            opacity: '1',
            transform: 'translate3d(-1px, 0, 0) scale(1)',
            filter: 'blur(0) grayscale(1) contrast(1.08)',
          },
          '100%': {
            opacity: '0.28',
            transform: 'translate3d(0, 18px, 0) scale(0.985)',
            filter: 'blur(12px) grayscale(1) contrast(0.9)',
          },
        },
        'cyber-suit-ghost': {
          '0%, 100%': { opacity: '0.08', transform: 'translate3d(0, 30px, 0) scale(1.02)', filter: 'blur(22px)' },
          '48%, 76%': { opacity: '0.18', transform: 'translate3d(0, 18px, 0) scale(1.01)', filter: 'blur(16px)' },
        },
        'cyber-suit-shock': {
          '0%, 72%, 100%': { opacity: '0', transform: 'translate3d(0, 0, 0) scaleX(1)' },
          '76%': { opacity: '0.32', transform: 'translate3d(-7px, -1px, 0) scaleX(1.015)' },
          '78%': { opacity: '0', transform: 'translate3d(5px, 1px, 0) scaleX(0.99)' },
          '82%': { opacity: '0.26', transform: 'translate3d(6px, 0, 0) scaleX(1.01)' },
          '84%': { opacity: '0', transform: 'translate3d(0, 0, 0) scaleX(1)' },
        },
        'cyber-suit-scan': {
          '0%': { transform: 'translate3d(0, -24vh, 0)', opacity: '0' },
          '20%': { opacity: '0.15' },
          '48%': { opacity: '0.72' },
          '76%': { opacity: '0.2' },
          '100%': { transform: 'translate3d(0, 28vh, 0)', opacity: '0' },
        },
        'cyber-loader-caret': {
          '0%, 45%': { opacity: '1' },
          '46%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'cyber-loader-fade-in': 'cyber-loader-fade-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cyber-loader-fade-out': 'cyber-loader-fade-out 360ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'cyber-loader-glitch': 'cyber-loader-glitch 1800ms steps(1, end) infinite',
        'cyber-loader-scan': 'cyber-loader-scan 1800ms cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'cyber-loader-grid': 'cyber-loader-grid 16s linear infinite',
        'cyber-loader-progress': 'cyber-loader-progress var(--cyber-loader-duration,2s) cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'cyber-loader-caret': 'cyber-loader-caret 1s steps(1, end) infinite',
        'cyber-suit-resolve': 'cyber-suit-resolve var(--cyber-suit-loop-duration,2.5s) cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'cyber-suit-ghost': 'cyber-suit-ghost var(--cyber-suit-loop-duration,2.5s) cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'cyber-suit-shock': 'cyber-suit-shock var(--cyber-suit-loop-duration,2.5s) steps(1, end) infinite',
        'cyber-suit-scan': 'cyber-suit-scan var(--cyber-suit-loop-duration,2.5s) cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
