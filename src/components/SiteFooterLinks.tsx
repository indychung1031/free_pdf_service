"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerLinks, homeHref, isEnglishPath } from "@/lib/i18n/locale";

export function SiteFooterLinks() {
  const pathname = usePathname();
  const locale = isEnglishPath(pathname) ? "en" : "ko";
  const links = footerLinks(locale);

  return (
    <>
      <p className="text-xs text-zinc-400">
        © 2026 Innovo Free PDF solution — {links.tagline}
      </p>
      <nav className="flex flex-wrap gap-x-5 gap-y-1">
        <Link
          href={links.faq.href}
          className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
        >
          {links.faq.label}
        </Link>
        <Link
          href={links.terms.href}
          className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
        >
          {links.terms.label}
        </Link>
        <Link
          href={links.privacy.href}
          className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
        >
          {links.privacy.label}
        </Link>
        <Link
          href={homeHref(locale === "en" ? "ko" : "en")}
          className="text-xs text-zinc-400 transition-colors hover:text-zinc-700"
        >
          {locale === "en" ? "한국어" : "English"}
        </Link>
      </nav>
    </>
  );
}
