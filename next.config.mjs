/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Images are served straight from /public: Vercel Hobby caps image resizing at 5,000 a month and
    // images break once that's used up. Remove this (to restore the resizer) if the project moves to Pro.
    unoptimized: true,
    remotePatterns: [
      // Stock product/category photography (placeholder — see launch checklist).
      { protocol: "https", hostname: "images.unsplash.com" },
      // Customer-uploaded artwork/references, served back via Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
