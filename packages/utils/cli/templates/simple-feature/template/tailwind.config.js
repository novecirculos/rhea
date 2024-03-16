/** @type {import('tailwindcss').Config} */
const theme = require('@novecirculos/theme');

module.exports = {
  content: ['./src/*.{js,jsx,ts,tsx}'],
  important: 'html',
  darkMode: 'class',
  theme,
  plugins: [
    require('nativewind/tailwind/css'),
    require('autoprefixer'),
    require('tailwindcss'),
  ],
};
