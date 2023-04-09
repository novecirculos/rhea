import {
  borders,
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  opacities,
  radii,
  shadows,
  space,
} from './'

export const theme = {
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
