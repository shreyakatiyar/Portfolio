import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/rsm1.pdf',
        headers: [
          { key: 'Content-Type',        value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline; filename="Shreya_Katiyar_Resume.pdf"' },
          { key: 'Cache-Control',       value: 'public, max-age=3600' },
        ],
      },
    ]
  },
}

export default nextConfig
