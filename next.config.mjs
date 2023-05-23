/** @type {import('next').NextConfig} */

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://chtijs.francejs.org"
    : "http://chtijs.localhost:3000";
const basePath = '';
const assetPrefix = `${baseURL}${basePath}`;

const config = {
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    baseURL,
    basePath,
  },
  assetPrefix,
  basePath,
  swcMinify: true,
};

export default config;