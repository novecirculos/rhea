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
  colors,
  fontSize: fontSizes,
  extend: {
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
