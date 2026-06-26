"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeaderActions() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 sm:text-sm"
    >
      전체 메뉴
    </Link>
  );
}
