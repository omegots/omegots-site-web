import type { MetadataRoute } from "next";
import { NOINDEX, SITE_URL } from "@/data/site";

/** robots.txt : tout est ouvert sauf /admin et /api ; tout est bloqué sur la démo (SITE_NOINDEX=1). */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    // /admin (interface des bénévoles) et l'API ne sont pas à indexer.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
