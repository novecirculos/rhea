const theme = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/**/**/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  important: 'html',
  darkMode: 'class',
  plugins: [
    require('nativewind/tailwind/css'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    ...theme,
  },
}
