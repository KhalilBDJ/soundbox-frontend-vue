/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html', // Inclure les fichiers HTML publics
    './src/**/*.{vue,js,ts,jsx,tsx}', // Analyser les fichiers Vue, JS et TS dans `src`
  ],
  theme: {
    extend: {
      fontFamily: {
        anonymous: ['"Anonymous Pro"', 'monospace'], // Police personnalisée
      },
      backgroundImage: {
        'custom-bg': "url('/assets/background.jpg')", // Image de fond personnalisée
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
    },
  },
  darkMode: 'media', // Active le mode sombre selon les préférences système
  plugins: [
    require('@tailwindcss/forms'), // Plugin pour styliser les formulaires
    require('@tailwindcss/typography'), // Plugin pour des styles typographiques avancés
  ],
};
