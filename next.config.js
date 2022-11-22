/** @type {import('next').NextConfig} */

const buildPrefix = process.env.NODE_ENV === 'production' ? '' : '';
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://chtijs.francejs.org'
    : 'http://chtijs.localhost:3000';

const nextConfig = {
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    buildPrefix,
    baseURL,
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '' : '',
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
