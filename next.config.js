const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname),
  trailingSlash: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // firecrawl depends on undici (a Node.js-only HTTP client) — it is
      // only imported dynamically at runtime in the interact page, so we
      // tell the client-side bundle to skip it.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      }
    }
    // Suppress the non-critical "Can't resolve 'undici'" build warning from
    // firecrawl — the module is dynamically imported at runtime only when
    // the interact page is used (requires NEXT_PUBLIC_FIRECRAWL_API_KEY).
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/firecrawl/, message: /Can't resolve 'undici'/ },
    ]
    return config
  },
}

module.exports = nextConfig