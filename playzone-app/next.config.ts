import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Tambahkan 'unsafe-inline' dan URL Midtrans di bagian script-src
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://app.midtrans.com https://snap-assets.sandbox.midtrans.com https://api.sandbox.midtrans.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;