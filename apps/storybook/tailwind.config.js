const { theme } = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  important: 'html',
  darkMode: 'class',
  plugins: [require('nativewind/tailwind/css')],
  theme: {
    ...theme,
  },
}
