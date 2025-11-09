import type { NextConfig } from "next";

// Keep config minimal while we diagnose filesystem read errors (UNKNOWN: read / readlink).
// Removed experimental flags that can trigger extra build workers & CSS optimizations
// which might exacerbate issues on cloud‑synced folders (OneDrive).
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
