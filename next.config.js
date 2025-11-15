/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd64gsuwffb70l.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'qiaxjdumtbgizmbpjeek.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
