import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/organizer",
        destination: "/workbench",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
