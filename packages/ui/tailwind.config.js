const theme = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx,mdx}'],
  important: 'html',
  darkMode: 'class',
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  theme: {
    ...theme,
  },
}
