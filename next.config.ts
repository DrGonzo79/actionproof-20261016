import type { NextConfig } from "next";

const repo = "actionproof-20261016";
const isPages = process.env.PAGES_BUILD === "true";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
  images: {unoptimized: true}
};
export default config;
