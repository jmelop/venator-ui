/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@venator/ui', '@venator/patterns', '@venator/tokens'],
}

module.exports = nextConfig
