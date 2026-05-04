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
        'neon-cyan': '#00ffe1',
        'neon-pink': '#ff00d4',
        'neon-purple': '#7a00ff',
        'deep-space': '#05010a',
        'glass-bg': 'rgba(255,255,255,0.03)',
        'glass-border': 'rgba(0,255,225,0.15)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,225,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,225,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '50px 50px',
      },
      boxShadow: {
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
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
