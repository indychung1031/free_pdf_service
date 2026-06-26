import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/branding";

export const dynamic = "force-static";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/workbench", priority: 0.9 },
  { path: "/merge", priority: 0.85 },
  { path: "/split", priority: 0.85 },
  { path: "/delete-pages", priority: 0.85 },
  { path: "/insert", priority: 0.85 },
  { path: "/faq", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
