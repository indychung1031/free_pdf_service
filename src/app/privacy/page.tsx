import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            개인정보처리방침
          </h1>
          <p className="text-sm text-zinc-500">
            Privacy Policy · 최종 수정일: 2026-06-26 (베타 초안)
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-amber-50 px-6 py-4">
          <p className="text-sm font-medium text-amber-800">베타 단계 안내</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-700">
            현재 서비스는 광고 없는 베타(Phase 2)입니다. 광고·쿠키·트래킹이 추가될 Phase 3
            상용화 시 본 방침을 갱신하고 사전 공지합니다.
          </p>
        </div>

        <section className="prose prose-zinc prose-sm max-w-none flex flex-col gap-6">
          <div>
            <h2 className="mb-2 text-base font-semibold">1. 총칙</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              Innovo Free PDF solution(이하 &quot;서비스&quot;)는 사용자의 프라이버시를 최우선으로
              설계되었습니다. 서비스의 핵심 아키텍처는{" "}
              <strong>100% 클라이언트 사이드 PDF 처리</strong>로, PDF 파일 데이터는 서버로
              전송되지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">2. 수집하는 정보</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              PDF 파일 내용·계정 정보는 수집하지 않습니다. 호스팅 제공자의 표준 접속 로그(IP,
              User-Agent)가 기록될 수 있습니다. 현재 광고 쿠키는 사용하지 않습니다 (Phase 3
              예정 시 사전 공지).
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">3. PDF 파일 처리</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              파일은 브라우저 메모리에서만 처리되며 결과는 로컬 다운로드됩니다. 서버로 PDF
              바이너리가 전송되지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">4. 문의</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              영문 요약:{" "}
              <a href="/en/privacy" className="text-zinc-900 underline">
                English privacy policy
              </a>
              · 최종 수정일: <strong>2026-06-26</strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
