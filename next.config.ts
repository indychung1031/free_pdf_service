import type { NextConfig } from "next";

// Netlify 빌드 시 정적 export로 전환 (redirects는 netlify.toml에서 처리)
const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = isNetlify
  ? { output: "export" }
  : {
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
