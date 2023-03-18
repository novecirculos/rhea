export interface IFontSizes {
  [x: string]: string
}

const names: any = {
  1: 'xs',
  2: 'sm',
  3: 'base',
  4: 'lg',
  5: 'xl',
  6: '2xl',
  7: '3xl',
  8: '4xl',
  9: '5xl',
  10: '6xl',
  11: '7xl',
  12: '8xl',
  13: '9xl',
}

export function getFontSizes(sizes: number[]) {
  const sorted = sizes.sort((a: any, b: any) => a - b)

  const fontSizes = {} as IFontSizes

  for (let i = 0; i < sorted.length; i++) {
    fontSizes[names[i + 1]] = `${sorted[i] * 0.0625}rem`
  }

  return fontSizes
}
