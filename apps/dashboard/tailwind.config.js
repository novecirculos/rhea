const tailwindConfig = require('@novecirculos/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '../../packages/design/src/**/**/*.{ts,tsx}',
  ],
  ...tailwindConfig,
}
