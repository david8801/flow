/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
