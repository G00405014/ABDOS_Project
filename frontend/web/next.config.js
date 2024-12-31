/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Disable cache in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // Add this if you're using images
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 