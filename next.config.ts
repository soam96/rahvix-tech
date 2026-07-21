import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile ESM-only packages so Next.js SSR can handle them
  transpilePackages: ["lenis"],
  images: {
    // Serve modern AVIF/WebP formats automatically — saves 30–50% bandwidth vs JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 60 days (reduces re-optimization on repeated visits)
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
  // Compress server responses (HTML, JSON, etc.)
  compress: true,
  // Disable x-powered-by header for slight security improvement
  poweredByHeader: false,
  experimental: {
    // Tree-shake lucide-react and framer-motion — only bundle icons/hooks that are imported
    // This reduces the client JS bundle by ~25-35% for icon-heavy pages
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
