import type { Metadata } from "next";
import { SITE_URL } from "@/lib/branding";

type PageMeta = {
  path: string;
  ko: { title: string; description: string };
  en: { title: string; description: string };
  /** EN locale 대응 URL */
  enPath: string;
  priority?: number;
};

export const PAGE_META: PageMeta[] = [
  {
    path: "",
    ko: {
      title: "무료 PDF 편집 도구 — 브라우저에서 처리, 서버 전송 없음",
      description:
        "PDF 병합·분할·페이지 삭제·삽입·작업실. 파일은 브라우저에서만 처리되며 서버로 1바이트도 전송되지 않습니다. 워터마크 없음, 횟수 제한 없음.",
    },
    en: {
      title: "Free PDF Tools — Merge, Split, Edit in Your Browser",
      description:
        "Merge, split, delete, and insert PDF pages in your browser. Zero upload — not a single byte sent to any server. No watermarks, no limits.",
    },
    enPath: "/en",
    priority: 1,
  },
  {
    path: "/workbench",
    ko: {
      title: "PDF 작업실 — 합치기·삭제·순서 변경",
      description:
        "PDF 여러 개를 한 화면에서 합치고, 페이지를 삭제·재배열·회전한 뒤 하나의 PDF로 저장합니다. 브라우저에서만 처리됩니다.",
    },
    en: {
      title: "PDF Workbench — Edit Pages Free in Browser",
      description:
        "Combine PDFs, reorder, delete, and rotate pages in one screen. 100% client-side — your files never leave your device.",
    },
    enPath: "/en/workbench",
    priority: 0.9,
  },
  {
    path: "/merge",
    ko: {
      title: "PDF 병합 무료 — 서버 전송 없음",
      description: "여러 PDF를 순서대로 하나로 합칩니다. 브라우저에서만 처리됩니다.",
    },
    en: {
      title: "Merge PDF Free — No Upload, No Watermark",
      description:
        "Combine multiple PDFs in order. Processed entirely in your browser — zero upload.",
    },
    enPath: "/en/merge",
    priority: 0.85,
  },
  {
    path: "/split",
    ko: {
      title: "PDF 분할 무료 — 워터마크 없음",
      description: "페이지 범위 추출 또는 페이지별 분할(ZIP). 브라우저에서만 처리됩니다.",
    },
    en: {
      title: "Split PDF Free — Browser Only",
      description:
        "Extract page ranges or split every page into separate files. No server upload.",
    },
    enPath: "/en/split",
    priority: 0.85,
  },
  {
    path: "/delete-pages",
    ko: {
      title: "PDF 페이지 삭제 무료",
      description: "지정한 페이지를 제거한 새 PDF를 만듭니다. 브라우저에서만 처리됩니다.",
    },
    en: {
      title: "Delete PDF Pages Free — No Upload",
      description: "Remove selected pages and download a new PDF. Client-side only.",
    },
    enPath: "/en/delete-pages",
    priority: 0.85,
  },
  {
    path: "/insert",
    ko: {
      title: "PDF 페이지 삽입 무료",
      description:
        "다른 PDF의 페이지를 원하는 위치에 넣습니다. 브라우저에서만 처리됩니다.",
    },
    en: {
      title: "Insert PDF Pages Free — Browser Only",
      description: "Insert pages from another PDF at any position. Zero upload.",
    },
    enPath: "/en/insert",
    priority: 0.85,
  },
  {
    path: "/faq",
    ko: {
      title: "FAQ",
      description:
        "Innovo Free PDF solution 자주 묻는 질문 — 프라이버시, 무료 정책, 파일 처리 방식",
    },
    en: {
      title: "FAQ — Free PDF Tool Questions Answered",
      description:
        "Privacy, pricing, and how Innovo Free PDF processes files entirely in your browser.",
    },
    enPath: "/en/faq",
    priority: 0.7,
  },
  {
    path: "/privacy",
    ko: {
      title: "개인정보처리방침",
      description: "Innovo Free PDF solution 개인정보처리방침",
    },
    en: {
      title: "Privacy Policy",
      description: "Innovo Free PDF solution privacy policy — we never receive your PDF files.",
    },
    enPath: "/en/privacy",
    priority: 0.3,
  },
  {
    path: "/terms",
    ko: {
      title: "이용약관",
      description: "Innovo Free PDF solution 이용약관",
    },
    en: {
      title: "Terms of Service",
      description: "Terms of use for Innovo Free PDF solution.",
    },
    enPath: "/en/terms",
    priority: 0.3,
  },
];

export function getPageMeta(path: string): PageMeta | undefined {
  return PAGE_META.find((p) => p.path === path);
}

export function buildAlternates(koPath: string, enPath: string) {
  const koUrl = `${SITE_URL}${koPath || ""}`;
  const enUrl = `${SITE_URL}${enPath}`;
  return {
    canonical: koUrl,
    languages: {
      ko: koUrl,
      en: enUrl,
      "x-default": koUrl,
    },
  };
}

/** 한국어 도구·정적 페이지 메타 (alternates 포함) */
export function koPageMetadata(path: string): Metadata {
  const page = getPageMeta(path);
  if (!page) return {};
  return {
    title: page.ko.title,
    description: page.ko.description,
    alternates: buildAlternates(page.path, page.enPath),
  };
}

/** /en/* 페이지 메타 */
export function enPageMetadata(enPath: string): Metadata {
  const koPath = enPath === "/en" ? "" : enPath.replace(/^\/en/, "");
  const page = getPageMeta(koPath);
  if (!page) return {};
  return {
    title: page.en.title,
    description: page.en.description,
    alternates: buildAlternates(page.path, enPath),
    openGraph: {
      locale: "en_US",
      title: page.en.title,
      description: page.en.description,
    },
  };
}

export function sitemapEntries(): { path: string; priority: number }[] {
  const seen = new Set<string>();
  const entries: { path: string; priority: number }[] = [];

  for (const page of PAGE_META) {
    if (!seen.has(page.path)) {
      seen.add(page.path);
      entries.push({ path: page.path, priority: page.priority ?? 0.5 });
    }
    if (page.enPath.startsWith("/en") && !seen.has(page.enPath)) {
      seen.add(page.enPath);
      entries.push({
        path: page.enPath,
        priority: (page.priority ?? 0.5) * 0.95,
      });
    }
  }

  return entries;
}
