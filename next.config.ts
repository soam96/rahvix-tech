import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern AVIF/WebP formats automatically — saves 30–50% bandwidth vs JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days (reduces re-optimization on repeated visits)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Compress server responses (HTML, JSON, etc.)
  compress: true,
  // Disable x-powered-by header for slight security improvement
  poweredByHeader: false,
};

export default nextConfig;
