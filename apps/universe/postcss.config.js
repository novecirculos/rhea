// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    'nativewind/postcss': {
      output: './static/nativewind-output.js',
    },
  },
}
