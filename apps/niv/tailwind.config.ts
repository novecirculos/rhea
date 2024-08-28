import type { Config } from 'tailwindcss'
import tailwindConfig from '@novecirculos/tokens'

export default {
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'components/*.{ts,tsx}',
    '../../packages/design/src/**/**/*.{ts,tsx}',
    '../../packages/editor/src/**/**/*.{ts,tsx}',
  ],
  ...tailwindConfig,
} satisfies Config
