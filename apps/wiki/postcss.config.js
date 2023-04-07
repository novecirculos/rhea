// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    'nativewind/postcss': {
      output: './public/nativewind-output.js',
    },
  },
}
