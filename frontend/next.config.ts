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
    // Disable optimization for now - images will be served directly
    unoptimized: true,
  }
};

export default nextConfig;
