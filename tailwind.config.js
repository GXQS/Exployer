/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens
        primary: '#00ffe1',
        secondary: '#7a00ff',
        accent: '#ff00d4',
        success: '#00ff88',
        warning: '#ffaa00',
        danger: '#ff3b3b',
        // Legacy aliases
        'neon-cyan': '#00ffe1',
        'neon-pink': '#ff00d4',
        'neon-purple': '#7a00ff',
        'deep-space': '#05010a',
        'glass-bg': 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(0,255,225,0.15)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,225,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,225,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '50px 50px',
      },
      boxShadow: {
        // Hover: soft glow
        'glow-primary-sm': '0 0 12px rgba(0,255,225,0.25)',
        'glow-secondary-sm': '0 0 12px rgba(122,0,255,0.25)',
        'glow-accent-sm': '0 0 12px rgba(255,0,212,0.25)',
        'glow-success-sm': '0 0 12px rgba(0,255,136,0.25)',
        'glow-warning-sm': '0 0 12px rgba(255,170,0,0.25)',
        'glow-danger-sm': '0 0 12px rgba(255,59,59,0.25)',
        // Active: strong glow
        'glow-primary': '0 0 20px rgba(0,255,225,0.5), 0 0 40px rgba(0,255,225,0.2)',
        'glow-secondary': '0 0 20px rgba(122,0,255,0.5), 0 0 40px rgba(122,0,255,0.2)',
        'glow-accent': '0 0 20px rgba(255,0,212,0.5), 0 0 40px rgba(255,0,212,0.2)',
        'glow-success': '0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.2)',
        'glow-warning': '0 0 20px rgba(255,170,0,0.5), 0 0 40px rgba(255,170,0,0.2)',
        'glow-danger': '0 0 20px rgba(255,59,59,0.5), 0 0 40px rgba(255,59,59,0.2)',
        // Legacy
        'neon-cyan': '0 0 20px rgba(0,255,225,0.4), 0 0 40px rgba(0,255,225,0.1)',
        'neon-pink': '0 0 20px rgba(255,0,212,0.4), 0 0 40px rgba(255,0,212,0.1)',
        'neon-purple': '0 0 20px rgba(122,0,255,0.4), 0 0 40px rgba(122,0,255,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'glow-pulse-warning': 'glowPulseWarning 1.5s ease-in-out infinite',
        'glow-pulse-danger': 'glowPulseDanger 1s ease-in-out infinite',
        'block-flow': 'blockFlow 0.4s ease-out',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,225,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0,255,225,0.8), 0 0 60px rgba(0,255,225,0.3)' },
        },
        glowPulseWarning: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,170,0,0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255,170,0,0.9), 0 0 50px rgba(255,170,0,0.4)' },
        },
        glowPulseDanger: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,59,59,0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255,59,59,0.9), 0 0 50px rgba(255,59,59,0.4)' },
        },
        blockFlow: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
