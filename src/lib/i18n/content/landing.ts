import type { Locale } from "@/lib/i18n/locale";

export type LandingTool = {
  href: string;
  title: string;
  description: string;
};

export type LandingContent = {
  heroTitle: string;
  heroSubtitle: string;
  toolsHeading: string;
  whyHeading: string;
  faqHeading: string;
  faqLink: string;
  faqHref: string;
  toolUiNotice?: string;
  features: { label: string; sublabel: string; description: string }[];
  tools: LandingTool[];
  faqs: { q: string; a: string }[];
};

const FEATURES_KO = [
  {
    label: "서버 전송 없음",
    sublabel: "Zero upload",
    description:
      "파일은 브라우저 메모리에서만 처리됩니다. 서버로 1바이트도 전송되지 않습니다.",
  },
  {
    label: "진짜 무료",
    sublabel: "Truly free",
    description:
      "횟수 제한·파일 용량 제한·유료 잠금이 없습니다. 수익은 배너 광고로 운영됩니다.",
  },
  {
    label: "워터마크 없음",
    sublabel: "No watermark",
    description: "결과 PDF에 워터마크를 삽입하지 않습니다. 그대로 사용 가능합니다.",
  },
];

const FEATURES_EN = [
  {
    label: "Zero upload",
    sublabel: "Privacy first",
    description:
      "Files are processed only in browser memory. Not a single byte is sent to any server.",
  },
  {
    label: "Truly free",
    sublabel: "No paywalls",
    description:
      "No usage caps, file size locks, or watermarks. Supported by banner ads (future phase).",
  },
  {
    label: "No watermark",
    sublabel: "Clean output",
    description: "Your downloaded PDFs are unchanged — no branding added by us.",
  },
];

const TOOLS_KO: LandingTool[] = [
  {
    href: "/workbench",
    title: "PDF 작업실",
    description:
      "PDF 여러 개·한 개 모두 — 페이지 합치기·삭제·순서 변경·삽입을 한 화면에서.",
  },
  {
    href: "/merge",
    title: "PDF 병합",
    description: "여러 PDF를 순서대로 하나로 합칩니다.",
  },
  {
    href: "/split",
    title: "PDF 분할",
    description: "페이지 범위 추출 또는 페이지별 분할(ZIP).",
  },
  {
    href: "/delete-pages",
    title: "페이지 삭제",
    description: "지정한 페이지를 제거합니다.",
  },
  {
    href: "/insert",
    title: "페이지 삽입",
    description: "다른 PDF의 페이지를 원하는 위치에 넣습니다.",
  },
];

const TOOLS_EN: LandingTool[] = [
  {
    href: "/workbench",
    title: "PDF Workbench",
    description: "Merge, delete, reorder, and insert pages — all in one screen.",
  },
  {
    href: "/merge",
    title: "Merge PDF",
    description: "Combine multiple PDFs in the order you choose.",
  },
  {
    href: "/split",
    title: "Split PDF",
    description: "Extract page ranges or split into one file per page (ZIP).",
  },
  {
    href: "/delete-pages",
    title: "Delete pages",
    description: "Remove selected pages and download a new PDF.",
  },
  {
    href: "/insert",
    title: "Insert pages",
    description: "Insert pages from another PDF at any position.",
  },
];

const FAQS_KO = [
  {
    q: "파일이 서버로 전송되나요?",
    a: "아니요. 모든 PDF 처리는 브라우저 내에서만 이루어집니다. 파일은 서버로 1바이트도 전송되지 않습니다.",
  },
  {
    q: "정말 무료인가요? 숨은 제한이 있나요?",
    a: "네, 진짜 무료입니다. 횟수·용량·유료 잠금·워터마크가 없습니다. 기기 메모리(RAM)가 유일한 실질적 한계입니다.",
  },
  {
    q: "Word·PPT 등 오피스 파일을 변환할 수 있나요?",
    a: "오피스→PDF 변환은 서버 처리가 필요해 제공하지 않습니다. 각 프로그램에서 「PDF로 저장」 후 이 서비스에서 편집하세요.",
  },
  {
    q: "모바일에서도 사용할 수 있나요?",
    a: "네, 모바일 브라우저에서도 동작합니다. 단, 대용량 파일 처리는 PC 환경을 권장합니다.",
  },
];

const FAQS_EN = [
  {
    q: "Are my files uploaded to a server?",
    a: "No. All processing happens in your browser. Your files are never sent to any server.",
  },
  {
    q: "Is it really free?",
    a: "Yes — no usage limits, paywalls, or watermarks. Your device's RAM is the only practical limit.",
  },
  {
    q: "Can I convert Word or PowerPoint to PDF?",
    a: "We don't offer office conversion (it requires server upload). Save as PDF in your office app first, then edit here.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes, in mobile browsers. Large files and drag-and-drop editing are easier on a desktop.",
  },
];

export function getLandingContent(locale: Locale): LandingContent {
  if (locale === "en") {
    return {
      heroTitle: "Edit PDFs — entirely in your browser",
      heroSubtitle:
        "Zero upload · No watermarks · No limits · Free",
      toolsHeading: "Tools",
      whyHeading: "Why Innovo",
      faqHeading: "FAQ",
      faqLink: "Full FAQ →",
      faqHref: "/en/faq",
      toolUiNotice:
        "Tool screens are currently in Korean. PDF processing works the same — icons and buttons are easy to follow.",
      features: FEATURES_EN,
      tools: TOOLS_EN,
      faqs: FAQS_EN,
    };
  }

  return {
    heroTitle: "PDF 편집, 브라우저에서 완결",
    heroSubtitle:
      "파일은 서버로 전송되지 않습니다 — 워터마크 없음, 횟수 제한 없음, 완전 무료",
    toolsHeading: "도구",
    whyHeading: "왜 Innovo인가",
    faqHeading: "자주 묻는 질문",
    faqLink: "전체 FAQ 보기 →",
    faqHref: "/faq",
    features: FEATURES_KO,
    tools: TOOLS_KO,
    faqs: FAQS_KO,
  };
}
