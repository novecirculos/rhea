module.exports = {
  sourceType: 'unambiguous',
  //   cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 100,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-export-namespace-from'],
};
