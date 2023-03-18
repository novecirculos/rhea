import {
  RadiiSm,
  RadiiNone,
  RadiiBase,
  RadiiFull,
  Radii3xl,
  Radii2xl,
  RadiiXl,
  RadiiLg,
  RadiiMd,
} from '../build/js'

export const radii = {
  none: `${RadiiNone.bottomRight}px`,
  sm: `${RadiiSm.bottomRight}px`,
  base: `${RadiiBase.bottomLeft}px`,
  md: `${RadiiMd.bottomLeft}px`,
  lg: `${RadiiLg.bottomLeft}px`,
  xl: `${RadiiXl.bottomLeft}px`,
  '2xl': `${Radii2xl.bottomLeft}px`,
  '3xl': `${Radii3xl.bottomRight}px`,
  full: `${RadiiFull.bottomLeft}px`,
} as const
