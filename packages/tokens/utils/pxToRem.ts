export function pxToRem(pixels: number): string {
  const rem = pixels * 0.0625

  return `${rem}rem`
}
