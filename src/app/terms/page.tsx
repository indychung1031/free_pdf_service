import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("/terms");

export default function TermsPage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">이용약관</h1>
          <p className="text-sm text-zinc-500">
            Terms of Service · 최종 수정일: 2026-06-26 (베타 초안)
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-amber-50 px-6 py-4">
          <p className="text-sm font-medium text-amber-800">베타 단계 안내</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-700">
            현재 서비스는 광고 없는 베타(Phase 2)입니다. 광고·쿠키가 추가될 Phase 3 상용화 시
            약관을 갱신하고 사전 공지합니다.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-sm">

          <section>
            <h2 className="font-semibold mb-2">제1조 (목적)</h2>
            <p className="leading-relaxed text-zinc-600">
              본 약관은 Innovo Free PDF solution(이하 "서비스")의 이용 조건 및 운영자와 사용자
              간의 권리·의무를 규정합니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제2조 (서비스 정의)</h2>
            <p className="leading-relaxed text-zinc-600">
              서비스는 브라우저 내에서 PDF 파일을 병합·분할·편집할 수 있는 클라이언트 사이드
              웹 도구입니다. PDF 파일 데이터는 사용자의 기기에서만 처리되며 서버로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제3조 (무료 이용 및 광고)</h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed text-zinc-600">
              <li>서비스의 모든 기능은 무료로 제공됩니다.</li>
              <li>횟수 제한·파일 용량 제한·유료 잠금·워터마크를 부과하지 않습니다.</li>
              <li>
                향후 Phase 3 상용화 시 배너 광고가 삽입될 수 있으며, 사전 공지합니다.
                광고는 작업 영역 외부에만 배치됩니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제4조 (사용자의 의무)</h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed text-zinc-600">
              <li>저작권·법령을 준수하는 파일에 한해 서비스를 이용해야 합니다.</li>
              <li>서비스를 불법적·악의적 목적으로 사용해서는 안 됩니다.</li>
              <li>대량 자동화(봇) 접속으로 서비스에 부하를 주는 행위를 금지합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제5조 (면책)</h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed text-zinc-600">
              <li>
                서비스는 처리 결과물의 완전성을 보증하지 않습니다. 중요한 파일은 원본을
                백업한 후 사용하세요.
              </li>
              <li>
                클라이언트 사이드 처리 특성상 기기 성능·브라우저 환경에 따라 결과가 다를 수
                있습니다.
              </li>
              <li>서비스는 사전 예고 없이 일시 중단될 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제6조 (지적재산권)</h2>
            <p className="leading-relaxed text-zinc-600">
              사용자가 처리한 PDF의 저작권은 사용자에게 있습니다. 서비스가 파일의 내용을
              열람·수집·이용하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">제7조 (약관 변경)</h2>
            <p className="leading-relaxed text-zinc-600">
              약관 변경 시 서비스 내 공지로 7일 이전에 안내합니다.
              최종 수정일: <strong>2026-06-26</strong>
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Terms of Service (English Summary)</h2>
            <p className="leading-relaxed text-zinc-500 italic">
              This service is a free, client-side PDF editing tool. All PDF processing
              occurs in your browser; files are never uploaded to any server. The service
              is provided free of charge without usage limits or watermarks. Banner ads
              may be introduced in a future phase with prior notice. Users are responsible
              for ensuring their files comply with applicable copyright laws. The service
              is provided as-is without warranties of completeness.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
