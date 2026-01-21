import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'guiadacozinha.com.br', pathname: '/**' },
      { protocol: 'https', hostname: 'institucional.vapza.com.br', pathname: '/**' },
      { protocol: 'https', hostname: 'blog.vapza.com.br', pathname: '/**' },
      { protocol: 'https', hostname: 'aguanabocabh.com', pathname: '/**' },
      { protocol: 'https', hostname: 'andinacocacola.vtexassets.com', pathname: '/**' },
      { protocol: 'https', hostname: 'carrefourbrfood.vtexassets.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;