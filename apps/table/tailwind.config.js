const tailwindConfig = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/**/**/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  ...tailwindConfig,
}
