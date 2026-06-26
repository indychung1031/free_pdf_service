import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-zinc-400">
          © 2026 Innovo Free PDF solution — 파일은 서버로 전송되지 않습니다
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          <Link
            href="/faq"
            className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/terms"
            className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            이용약관
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
}
