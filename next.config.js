/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['media.guim.co.uk', 'static.guim.co.uk']
  }
}

module.exports = nextConfig
