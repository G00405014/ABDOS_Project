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
  reactStrictMode: false, // Temporarily disable strict mode to debug issues
  experimental: {
    // Reduce potential runtime errors
    scrollRestoration: true,
  },
  // Ensure that we don't try to use JSX for styled-jsx
  compiler: {
    styledComponents: true,
  },
  // Add API proxy configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig 