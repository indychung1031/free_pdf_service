export const SERVICE_NAME = "Innovo Free PDF solution";

export const SERVICE_TAGLINE =
  "브라우저에서 처리하는 무료 PDF 도구 — 파일은 서버로 전송되지 않습니다.";

/** 배포 환경별 공개 URL (운영·문서 참고) */
export const DEPLOYMENT_URLS = {
  /** 베타 — Vercel Hobby (기능 QA) */
  vercel: "https://free-pdf-service.vercel.app",
  /** AdSense 테스트 — Netlify Free (상업 이용 허용) */
  netlify: "https://innovo-free-pdf.netlify.app",
} as const;

/** sitemap·OG·hreflang — 배포 플랫폼의 `NEXT_PUBLIC_SITE_URL` 또는 Vercel 기본값 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? DEPLOYMENT_URLS.vercel;

export const LOGO_PATH = "/logo/logo.png";
export const LOGO_ALT = "INNOVO Solution";
