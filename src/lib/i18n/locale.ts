export type Locale = "ko" | "en";

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function homeHref(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

/** KO ↔ EN 경로 매핑 */
export function localeHref(pathname: string, target: Locale): string {
  const en = isEnglishPath(pathname);
  const koPath = en ? (pathname === "/en" ? "/" : pathname.slice(3)) : pathname;

  if (target === "en") {
    if (en) return pathname;
    if (koPath === "/") return "/en";
    return `/en${koPath}`;
  }

  if (!en) return pathname;
  return koPath || "/";
}

export function footerLinks(locale: Locale) {
  if (locale === "en") {
    return {
      tagline: "Your files are never uploaded to our servers",
      faq: { href: "/en/faq", label: "FAQ" },
      terms: { href: "/en/terms", label: "Terms" },
      privacy: { href: "/en/privacy", label: "Privacy" },
    };
  }
  return {
    tagline: "파일은 서버로 전송되지 않습니다",
    faq: { href: "/faq", label: "FAQ" },
    terms: { href: "/terms", label: "이용약관" },
    privacy: { href: "/privacy", label: "개인정보처리방침" },
  };
}
