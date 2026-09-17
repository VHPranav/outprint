/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Stock product/category photography (placeholder — see launch checklist).
      { protocol: "https", hostname: "images.unsplash.com" },
      // Customer-uploaded artwork/references, served back via Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
