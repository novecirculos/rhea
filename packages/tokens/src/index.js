const space = {
  px: '1px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
}

const shadows = {
  base: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);',
  md: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);',
  lg: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);',
  xl: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);',
  '2xl': '0px 25px 50px rgba(0, 0, 0, 0.25);',
  inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.06);',
}

const radii = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
}

const opacities = {
  semiTransparent: 0.08,
  light: 0.16,
  medium: 0.32,
  intense: 0.64,
  semiOpaque: 0.72,
}

const lineHeights = {
  shorter: '125%',
  short: '140%',
  base: '150%',
  tall: '180%',
}

const fonts = {
  default: 'Noto Serif, serif',
  secondary: 'Alice, serif',
  code: 'serif',
}

const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
}

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
}

const borders = {
  hairline: '1px solid',
  thin: '2px solid',
  thick: '4px solid',
  heavy: '8px solid',
}

const colors = {
  black: '#000',
  white: '#fff',
  gray: {
    50: '#f7f8f9',
    100: '#fafbfb',
    200: '#f2f3f5',
    300: '#d3d5da',
    400: '#8f9db0',
    500: '#6f7b8e',
    600: '#2f3c4d',
    700: '#1f2b37',
    800: '#1b2430',
    900: '#131d28',
    950: '#0b141f',
  },
  primary: {
    100: '#FAE6E6',
    200: '#F4CDCD',
    300: '#EFB3B3',
    400: '#EA9A9A',
    500: '#E48181',
    600: '#DF6868',
    700: '#DA4E4E',
    800: '#D43535',
    900: '#C22929',
  },
  secondary: {
    100: '#F8E9DA',
    200: '#F6E4D2',
    300: '#F1D3B6',
    400: '#F2D7BC',
    500: '#EECAA6',
    600: '#EABC8F',
    700: '#E5AF79',
    800: '#E1A262',
    900: '#DD944C',
  },
  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.75)',
    900: 'rgba(0, 0, 0, 0.92)',
  },
  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.75)',
    900: 'rgba(255, 255, 255, 0.92)',
  },
}

module.exports = {
  fontSize: fontSizes,
  extend: {
    colors,
    spacing: space,
    lineHeights,
    borders,
    fontWeights,
    opacities,
    radii,
    shadows,
    fontFamily: {
      serif: fonts.default,
      secondary: fonts.secondary,
    },
  },
}
