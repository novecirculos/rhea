/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/**/**/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  important: 'html',
  darkMode: 'class',
  plugins: [
    require('nativewind/tailwind/css'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  theme: {},
}
