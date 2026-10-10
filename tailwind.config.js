/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'background-deep': '#06070B',
        'background-base': '#080A0F',
        'background-elevated': '#0D111B',
        'surface-hover': 'rgba(255, 255, 255, 0.08)',
        'foreground-muted': '#94A3B8',
        'foreground-subtle': '#64748B',
        'accent-bright': '#38BDF8',
        'accent-glow': 'rgba(14, 165, 233, 0.25)',
        'border-default': '#252B3A',
        'border-hover': '#363E53',
        'border-accent': 'rgba(14, 165, 233, 0.35)',
        background: '#080A0F',
        surface: 'rgba(255, 255, 255, 0.04)',
        'surface-elevated': '#0D111B',
        foreground: '#F1F5F9',
        border: '#252B3A',
        input: '#0F131D',
        ring: '#0EA5E9',
        cyan: {
          DEFAULT: '#06B6D4',
          light: '#38BDF8',
          glow: 'rgba(6, 182, 212, 0.25)',
        },
        primary: {
          DEFAULT: '#0284C7',
          hover: '#0EA5E9',
          dark: '#0369A1',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          foreground: '#F1F5F9',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          foreground: '#94A3B8',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          bright: '#38BDF8',
          glow: 'rgba(14, 165, 233, 0.25)',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#10B981',
          light: 'rgba(16, 185, 129, 0.1)',
          foreground: '#34D399',
        },
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
        lg: '8px',
        md: '8px',
        sm: '6px',
      },
      fontSize: {
        'display': ['42px', { lineHeight: '48px', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'eyebrow': ['11px', { lineHeight: '14px', letterSpacing: '0.12em', fontWeight: '700' }],
      },
      spacing: {
        '4.5': '18px',
      },
    },
  },
  plugins: [],
};
