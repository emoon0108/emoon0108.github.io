/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
