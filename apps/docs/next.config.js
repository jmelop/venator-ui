const withMDX = require('@next/mdx')();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@venator-ui/ui', '@venator-ui/patterns', '@venator-ui/tokens'],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
