/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    FMP_APIKEY: process.env.FMP_APIKEY,
    FMP_BASE_URL: process.env.FMP_BASE_URL,
    SERVER_URL: process.env.SERVER_URL,
  },
}

module.exports = nextConfig
