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
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
};

module.exports = nextConfig;
