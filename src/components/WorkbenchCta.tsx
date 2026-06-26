import Link from "next/link";

type WorkbenchCtaProps = {
  hint: string;
};

/** Phase 1.6d: 삭제·삽입 단독 페이지 → 작업실 유도 */
export function WorkbenchCta({ hint }: WorkbenchCtaProps) {
  return (
    <aside className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-sm leading-6 text-zinc-600">
        {hint}
        {" — "}
        <Link
          href="/workbench"
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500"
        >
          PDF 작업실에서 한 번에
        </Link>
      </p>
    </aside>
  );
}
