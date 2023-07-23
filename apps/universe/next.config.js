/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    workerThreads: false,
    cpus: 1,
    serverActions: true,
  },
  transpilePackages: [
    '@novecirculos/design',
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
