const tailwindConfig = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/design/src/**/**/*.{ts,tsx}',
  ],
  ...tailwindConfig,
}
