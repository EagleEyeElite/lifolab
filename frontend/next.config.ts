import type { NextConfig } from "next";
import {schema} from "@/env";
import {cleanEnv} from "envalid";

const env = cleanEnv(process.env, schema)

const nextConfig: NextConfig = {
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
    // In development, proxy to the actual WordPress CMS URL
    // In production, proxy to the internal Docker container
    const destination = process.env.NODE_ENV === 'production'
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
