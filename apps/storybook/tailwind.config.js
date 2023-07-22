const tailwindConfig = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/*.{ts,tsx}',
    '../../packages/design/src/**/**/*.{ts,tsx}',
  ],
  ...tailwindConfig,
}
