/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["faunadb"],
  },
  transpilePackages: ["@novecirculos/design", "@novecirculos/tokens"],
  images: {
    domains: [
      "media.graphassets.com",
      "i.ibb.co",
      "github.com",
      "lh3.googleusercontent.com",
    ],
  },
};
