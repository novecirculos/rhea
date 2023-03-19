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
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      'nativewind/babel',
      {
        mode: 'compileOnly',
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
