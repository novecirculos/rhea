import { withExpo } from '@expo/next-adapter'

await import('./src/env.mjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'nativewind',
    'react-native-gesture-handler',
    '@novecirculos/ui',
    '@novecirculos/tokens',
    '@novecirculos/graphql',
  ],
  images: {
    domains: ['media.graphassets.com', 'i.ibb.co'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
      tls: false,
    }
    return config
  },
}

export default withExpo(nextConfig)
