// This is a static site, not a Next.js project
// This file exists only to prevent Amplify from looking for Next.js configuration
module.exports = {
  // Disable Next.js features
  reactStrictMode: false,
  swcMinify: false,
  // Explicitly set this as a static site
  output: "export",
  // Disable all Next.js features
  experimental: {
    appDir: false,
    serverComponents: false,
    serverActions: false,
  },
};
