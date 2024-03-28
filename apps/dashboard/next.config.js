/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["faunadb"],
  },
  transpilePackages: [
    "@novecirculos/design",
    "@novecirculos/tokens",
    "@novecirculos/context",
    "@novecirculos/dice",
  ],
  webpack(config, { isServer, dev }) {
    // Use the client static directory in the server bundle and prod mode
    // Fixes `Error occurred prerendering page "/"`
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? "../static/wasm/[modulehash].wasm"
        : "static/wasm/[modulehash].wasm";

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },
  images: {
    domains: [
      "media.graphassets.com",
      "i.ibb.co",
      "github.com",
      "lh3.googleusercontent.com",
    ],
  },
};
