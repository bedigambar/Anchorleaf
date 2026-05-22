import type { MetadataRoute } from "next";

const BASE_URL = "https://anchorleaf.app";

const STATIC_ROUTES = [
  "",
  "/about",
  "/learn",
  "/dbt",
  "/dbt/cheatsheet",
  "/tools",
  "/handbook",
  "/journal",
];

const ARTICLE_SLUGS = [
  "what-does-bpd-feel-like",
  "who-is-marsha-linehan",
  "understanding-emotional-intensity",
  "fear-of-abandonment",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));
  const articles: MetadataRoute.Sitemap = ARTICLE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...main, ...articles];
}
