import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/solari-board" : "",
  assetPrefix: isGhPages ? "/solari-board/" : "",
};

export default nextConfig;
