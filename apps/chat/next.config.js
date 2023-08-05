/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    workerThreads: false,
    cpus: 1,
    serverActions: true,
    serverComponentsExternalPackages: 'faunadb',
  },
  transpilePackages: ['@novecirculos/design', '@novecirculos/tokens'],
  images: {
    domains: [
      'media.graphassets.com',
      'i.ibb.co',
      'github.com',
      'lh3.googleusercontent.com',
    ],
  },
}
