"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isEnglishPath, localeHref } from "@/lib/i18n/locale";

export function LanguageSwitch() {
  const pathname = usePathname();
  const en = isEnglishPath(pathname);

  return (
    <nav
      className="flex shrink-0 items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-[11px] font-medium sm:text-xs"
      aria-label="Language"
    >
      <Link
        href={localeHref(pathname, "ko")}
        className={`rounded-md px-2 py-1 transition ${
          !en
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
        aria-current={!en ? "page" : undefined}
      >
        KO
      </Link>
      <Link
        href={localeHref(pathname, "en")}
        className={`rounded-md px-2 py-1 transition ${
          en
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
        aria-current={en ? "page" : undefined}
      >
        EN
      </Link>
    </nav>
  );
}
