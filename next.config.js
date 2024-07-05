/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'google.com', 'asset.kompas.com'],
  },
}

module.exports = nextConfig
