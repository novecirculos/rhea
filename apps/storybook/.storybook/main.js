module.exports = {
  stories: [
    '../src/pages/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-react-native-web',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    interactionsDebugger: true,
    storyStoreV7: true,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      locales: 'en-US',
    },
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
}
