import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "justuse.me" }],
        destination: "https://www.justuse.me/:path*",
        permanent: true,
      },
      {
        source: "/news/how-to-merge-pdf-files",
        destination: "/news/how-to-merge-pdf-files-online-free",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
