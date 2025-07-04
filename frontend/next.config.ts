import type { NextConfig } from "next";
import * as dotenvSafe from 'dotenv-safe';

// Load environment variables
dotenvSafe.config({
  path: '../.env',
  sample: '../.env.example',
});

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
    ],
  }
};

export default nextConfig;
