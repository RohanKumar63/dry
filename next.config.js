/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore specific ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Add increased API timeout
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
  // Increase serverless function timeout
  serverRuntimeConfig: {
    // Will only be available on the server side
    timeoutSeconds: 60, // 60 seconds timeout
  },
}

module.exports = nextConfig 
