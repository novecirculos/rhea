import {
  FontTextxsRegular,
  FontTextsmRegular,
  FontTextbaseRegular,
  FontTextlgRegular,
  FontTextxlRegular,
  FontText2xlRegular,
  FontText3xlRegular,
  FontText4xlRegular,
  FontText5xlRegular,
  FontText6xlRegular,
} from '../build/js'

export const fontSizes = {
  xs: `${FontTextxsRegular.fontSize * 0.0625}rem`,
  sm: `${FontTextsmRegular.fontSize * 0.0625}rem`,
  base: `${FontTextbaseRegular.fontSize * 0.0625}rem`,
  lg: `${FontTextlgRegular.fontSize * 0.0625}rem`,
  xl: `${FontTextxlRegular.fontSize * 0.0625}rem`,
  '2xl': `${FontText2xlRegular.fontSize * 0.0625}rem`,
  '3xl': `${FontText3xlRegular.fontSize * 0.0625}rem`,
  '4xl': `${FontText4xlRegular.fontSize * 0.0625}rem`,
  '5xl': `${FontText5xlRegular.fontSize * 0.0625}rem`,
  '6xl': `${FontText6xlRegular.fontSize * 0.0625}rem`,
} as const
