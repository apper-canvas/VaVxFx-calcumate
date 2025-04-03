/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',  // More vibrant purple
          light: '#a78bfa',
          dark: '#7c3aed',
          vivid: '#9333ea'
        },
        secondary: {
          DEFAULT: '#3b82f6',  // Vibrant blue
          light: '#60a5fa',
          dark: '#2563eb',
          vivid: '#1d4ed8'
        },
        accent: {
          DEFAULT: '#f43f5e',  // Vibrant pink/red
          light: '#fb7185',
          dark: '#e11d48',
          yellow: '#facc15',
          orange: '#fb923c',
          teal: '#2dd4bf'
        },
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',  
          500: '#64748b',  
          600: '#475569',  
          700: '#334155',  
          800: '#1e293b',  
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 15px rgba(139, 92, 246, 0.5)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        'gradient-secondary': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'gradient-accent': 'linear-gradient(135deg, #f43f5e, #ec4899)',
        'gradient-success': 'linear-gradient(135deg, #10b981, #2dd4bf)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b, #facc15)',
        'gradient-info': 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b, #334155)',
        'gradient-light': 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        'gradient-purple-blue': 'linear-gradient(135deg, #9333ea, #3b82f6)',
        'gradient-pink-purple': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        'gradient-blue-teal': 'linear-gradient(135deg, #3b82f6, #2dd4bf)',
        'gradient-yellow-orange': 'linear-gradient(135deg, #facc15, #fb923c)'
      }   
    }  
  },
  plugins: [],
  darkMode: 'class',
}