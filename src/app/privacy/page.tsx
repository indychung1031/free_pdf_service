import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Innovo Free PDF solution 개인정보처리방침",
};

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
            <h2 className="text-base font-semibold mb-2">1. 총칙</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              Innovo Free PDF solution(이하 "서비스")는 사용자의 프라이버시를 최우선으로
              설계되었습니다. 서비스의 핵심 아키텍처는 <strong>100% 클라이언트 사이드 PDF
              처리</strong>로, PDF 파일 데이터는 서버로 전송되지 않습니다.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 italic">
              Innovo Free PDF solution is designed with privacy as a first principle.
              All PDF processing runs entirely in your browser — your files are never
              transmitted to any server.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">2. 수집하는 정보</h2>
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50">
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">항목</th>
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">수집 여부</th>
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">업로드 PDF 파일</td>
                    <td className="px-4 py-3 font-semibold text-green-700">수집 안 함</td>
                    <td className="px-4 py-3 text-zinc-500">브라우저 메모리만 사용, 서버 미전송</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">이름·이메일·계정 정보</td>
                    <td className="px-4 py-3 font-semibold text-green-700">수집 안 함</td>
                    <td className="px-4 py-3 text-zinc-500">가입·로그인 불필요</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">접속 로그 (IP, UA, 페이지 방문)</td>
                    <td className="px-4 py-3 text-zinc-700">Vercel 자동 수집</td>
                    <td className="px-4 py-3 text-zinc-500">정적 호스팅 표준 로그, 개인 식별 목적 미사용</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">쿠키 / 트래킹</td>
                    <td className="px-4 py-3 font-semibold text-green-700">현재 없음</td>
                    <td className="px-4 py-3 text-zinc-500">Phase 3 광고 도입 시 추가 예정, 사전 공지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">3. PDF 파일 처리 방식</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              파일을 선택하면 브라우저의 <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">File API</code>를
              통해 로컬 메모리에 로드됩니다. 처리 결과는 <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">Blob</code>으로
              변환되어 즉시 로컬 다운로드됩니다. 처리 완료 후 메모리에서 해제됩니다. 서버로의 네트워크
              요청은 발생하지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">4. 제3자 서비스</h2>
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50">
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">서비스</th>
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">용도</th>
                    <th className="px-4 py-3 text-left font-semibold text-zinc-700">데이터</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">Vercel</td>
                    <td className="px-4 py-3 text-zinc-600">정적 호스팅</td>
                    <td className="px-4 py-3 text-zinc-500">표준 액세스 로그 (Vercel 정책 적용)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-700">Google AdSense</td>
                    <td className="px-4 py-3 text-zinc-600">배너 광고 (예정)</td>
                    <td className="px-4 py-3 text-zinc-500">Phase 3 상용화 시 추가, 별도 공지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">5. 개인정보 보호 책임자</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              문의사항은 서비스 운영자에게 연락하세요.
              본 방침에 대한 중요 변경은 서비스 내 공지로 사전 안내합니다.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">6. 방침 변경</h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              광고·쿠키·트래킹 분석이 추가될 Phase 3 이전에 개정 내용을 서비스 내에 공지합니다.
              최종 수정일: <strong>2026-06-26</strong>
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}
