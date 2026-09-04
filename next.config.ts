import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only honours quality values declared here; without this the
    // hero silently falls back to q=75 and the photography gets re-compressed.
    qualities: [75, 90, 95],
    // AVIF first: roughly half the bytes of JPEG at matching quality, which is
    // what lets the hero stay visually lossless without a heavy download.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
