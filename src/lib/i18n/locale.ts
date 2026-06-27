export type Locale = "ko" | "en";

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function homeHref(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

/** KO ↔ EN 경로 매핑 (도구 페이지는 EN 랜딩으로) */
export function localeHref(pathname: string, target: Locale): string {
  const en = isEnglishPath(pathname);

  if (target === "en") {
    if (en) return pathname;
    if (pathname === "/") return "/en";
    if (pathname === "/faq") return "/en/faq";
    if (pathname === "/privacy") return "/en/privacy";
    if (pathname === "/terms") return "/en/terms";
    return "/en";
  }

  if (!en) return pathname;
  if (pathname === "/en") return "/";
  const rest = pathname.slice(3);
  return rest || "/";
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
