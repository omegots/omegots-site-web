import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/data/site";

/** sitemap.xml : les huit pages publiques (liste dans data/site.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
