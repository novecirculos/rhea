import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import nodejs from '@astrojs/node'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: nodejs({
    mode: 'middleware',
  }),
  vite: {
    ssr: {
      noExternal: ['react-icons', '@radix-ui/react-dialog', 'lucide-react'],
    },
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
