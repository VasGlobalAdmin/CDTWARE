/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a fully static site in ./out so it can be dropped onto Netlify
  // (drag-and-drop / zip upload). `next build` now also exports automatically.
  output: "export",
  // Static hosts can't run Next's image-optimizer, so serve images as-is.
  // (The site uses plain <img> tags, so this just keeps things safe.)
  images: { unoptimized: true },
  // Each route is emitted as a folder with its own index.html, which avoids
  // 404s for asset/route paths on a plain static host like Netlify.
  trailingSlash: true,
};

export default nextConfig;
