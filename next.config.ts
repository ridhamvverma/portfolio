import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.0.0.2", "192.168.29.235"],
};

export default nextConfig;
