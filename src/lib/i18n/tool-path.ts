import type { Locale } from "@/lib/i18n/locale";

const TOOL_SLUGS = [
  "/workbench",
  "/merge",
  "/split",
  "/delete-pages",
  "/insert",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

export function isToolPath(pathname: string): boolean {
  const path = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname;
  return TOOL_SLUGS.some((slug) => path === slug);
}

export function toolHref(slug: ToolSlug, locale: Locale): string {
  return locale === "en" ? `/en${slug}` : slug;
}

export function workbenchHref(locale: Locale): string {
  return toolHref("/workbench", locale);
}
