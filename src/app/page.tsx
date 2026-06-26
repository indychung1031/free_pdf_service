import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 PDF 편집 도구 — 브라우저에서 처리, 서버 전송 없음",
  description:
    "PDF 병합·분할·페이지 삭제·삽입·작업실. 파일은 브라우저에서만 처리되며 서버로 1바이트도 전송되지 않습니다. 워터마크 없음, 횟수 제한 없음.",
};

const tools = [
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

const features = [
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

const faqs = [
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

export default function Home() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            PDF 편집, 브라우저에서 완결
          </h1>
          <p className="text-base leading-7 text-zinc-600">
            파일은 서버로 전송되지 않습니다 — 워터마크 없음, 횟수 제한 없음, 완전 무료
          </p>

          {/* Feature badges */}
          <div className="mt-2 flex flex-wrap gap-2">
            {features.map((f) => (
              <span
                key={f.label}
                className="inline-flex flex-col rounded-xl border border-zinc-200 bg-white px-4 py-2 shadow-sm"
              >
                <span className="text-sm font-medium text-zinc-900">{f.label}</span>
                <span className="text-[11px] text-zinc-400">{f.sublabel}</span>
              </span>
            ))}
          </div>
        </header>

        {/* Tools */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            도구
          </h2>
          <div className="grid gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition hover:border-zinc-300 hover:shadow"
              >
                <h3 className="text-lg font-medium">{tool.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature detail */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            왜 Innovo인가
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-zinc-900">{f.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            자주 묻는 질문
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
              >
                <p className="text-sm font-medium text-zinc-900">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/faq"
              className="text-xs text-zinc-500 underline-offset-2 hover:text-zinc-900 hover:underline transition-colors"
            >
              전체 FAQ 보기 →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
