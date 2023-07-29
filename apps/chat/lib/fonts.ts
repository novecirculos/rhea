import { JetBrains_Mono as FontMono, Alice, Noto_Serif } from 'next/font/google'

export const fontMain = Noto_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const fontSecondary = Alice({
  subsets: ['latin'],
  weight: '400',
})
