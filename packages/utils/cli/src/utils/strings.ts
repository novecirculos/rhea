export const upperFirst = (...args: string[]): string =>
  require('lodash.upperfirst')(...args);
export const camelCase = (...args: string[]): string =>
  require('lodash.camelcase')(...args);
export const kebabCase = (...args: string[]): string =>
  require('lodash.kebabcase')(...args);
export const pascalCase: (value: string) => string = (value) => {
  return upperFirst(camelCase(value));
};
