const tailwindConfig = require('@novecirculos/tokens')

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  ...tailwindConfig,
  prefix: "novel-",
};
