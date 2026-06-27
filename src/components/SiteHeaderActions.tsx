"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeHref, isEnglishPath } from "@/lib/i18n/locale";

export function SiteHeaderActions() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/en";
  if (isHome) return null;

  const en = isEnglishPath(pathname);

  return (
    <Link
      href={homeHref(en ? "en" : "ko")}
      className="shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 sm:text-sm"
    >
      {en ? "All tools" : "전체 메뉴"}
    </Link>
  );
}
