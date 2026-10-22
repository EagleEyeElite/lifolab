import type { NextConfig } from "next";
import {schema} from "@/env";
import {cleanEnv} from "envalid";

const env = cleanEnv(process.env, schema)

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    cms: {
      stale: 30,
      revalidate: 10,
      expire: Infinity,
    },
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "wordpress" },
      { protocol: "http", hostname: new URL(env.WORDPRESS_CMS_PUBLIC_URL).hostname},
      { protocol: "https", hostname: new URL(env.WORDPRESS_CMS_PUBLIC_URL).hostname},
    ],
  },
  async rewrites() {
    // In development and on Vercel, proxy to the actual WordPress CMS URL
    // In production (Docker), proxy to the internal Docker container
    const destination = process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'http://wordpress:80/wp-content/:path*'
      : `${env.WORDPRESS_CMS_PUBLIC_URL}/wp-content/:path*`;

    return [
      {
        source: '/wp-proxy/:path*',
        destination,
      },
    ];
  },
};

export default nextConfig;
