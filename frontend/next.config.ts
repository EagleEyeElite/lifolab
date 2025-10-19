import type { NextConfig } from "next";
import {schema} from "@/env";
import dotenv from 'dotenv';
import {cleanEnv} from "envalid";

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: ['.env', '../.env', '../.env.local']
  });
}

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
    // Disable optimization for now - images will be served directly
    unoptimized: true,
  }
};

export default nextConfig;
