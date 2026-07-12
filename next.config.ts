import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site is HTML, CSS, JS and fonts self-hosted at build.
  // There is no server, because there is nothing for a server to do — nothing this
  // site computes ever leaves the visitor's tab.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
