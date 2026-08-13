import { CATEGORIES } from "@/lib/categories";

const SITE_URL = "https://cdtwarehouse.com";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/categories/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
