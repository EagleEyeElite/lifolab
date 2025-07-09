import type { NextConfig } from "next";
import * as dotenvSafe from 'dotenv-safe';

// Load environment variables
dotenvSafe.config({
  path: '../.env',
  sample: '../.env.example',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "cms.lifolab.conrad-klaus.de" },
    ],
  }
};

export default nextConfig;
