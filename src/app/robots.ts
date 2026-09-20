import type { MetadataRoute } from "next";
import { NOINDEX, SITE_URL } from "@/data/site";

/** robots.txt : tout est ouvert, sauf sur la démo (SITE_NOINDEX=1) où tout est bloqué. */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
