import type { MetadataRoute } from "next";
import { articlePath } from "@/lib/articles/be-deep-enough";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", articlePath].map(path => ({ url: new URL(path, SITE_URL).href }));
}
