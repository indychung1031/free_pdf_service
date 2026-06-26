import Link from "next/link";
import { SERVICE_TAGLINE } from "@/lib/branding";

const tools = [
  {
    href: "/organizer",
    title: "페이지 Organizer",
    description: "썸네일 그리드에서 드래그·회전·삭제 후 저장합니다.",
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

export default function Home() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            브라우저에서 처리하는 PDF 도구
          </h1>
          <p className="text-base leading-7 text-zinc-600">{SERVICE_TAGLINE}</p>
        </header>

        <section className="grid gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition hover:border-zinc-300 hover:shadow"
            >
              <h2 className="text-lg font-medium">{tool.title}</h2>
              <p className="mt-1 text-sm text-zinc-600">{tool.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
