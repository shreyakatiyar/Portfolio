import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Serve AVIF where supported (much smaller than WebP for photos), WebP otherwise
    formats: ['image/avif', 'image/webp'],
    // Optimized images are content-hashed by URL — cache them for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

export default nextConfig
