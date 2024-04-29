/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Ajusta o fallback para 'fs' quando usado no navegador
    return config;
  },
};

module.exports = nextConfig;
