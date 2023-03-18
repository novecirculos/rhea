import { createStitches, defaultThemeMap } from '@stitches/react'
import {
  colors,
  fonts,
  fontWeights,
  lineHeights,
  radii,
  space,
  fontSizes,
  shadows,
  borders,
  opacities,
} from '@yhva/tokens'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    fonts,
    fontWeights,
    lineHeights,
    radii,
    space,
    fontSizes,
    shadows,
    borderStyles: borders,
    opacities,
  },
  themeMap: {
    ...defaultThemeMap,
    height: 'space',
    width: 'space',
    opacity: 'opacities',
  },
  utils: {
    m: (value: string) => ({
      margin: value,
    }),
    mt: (value: string) => ({
      marginTop: value,
    }),
    mr: (value: string) => ({
      marginRight: value,
    }),
    mb: (value: string) => ({
      marginBottom: value,
    }),
    ml: (value: string) => ({
      marginLeft: value,
    }),
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // A property for applying width/height together
    size: (value: string) => ({
      width: value,
      height: value,
    }),
  },
})
