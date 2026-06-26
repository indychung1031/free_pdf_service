import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Innovo Free PDF solution 자주 묻는 질문 — 프라이버시, 무료 정책, 파일 처리 방식에 대한 답변",
};

const faqs = [
  {
    section: "프라이버시 & 보안",
    en: "Privacy & Security",
    items: [
      {
        q: "파일이 서버로 전송되나요?",
        en_q: "Are my files uploaded to a server?",
        a: "아니요. 모든 PDF 처리는 브라우저 내에서만 이루어집니다. 파일 데이터는 서버로 1바이트도 전송되지 않습니다. 인터넷이 끊어진 상태에서도 처리가 완료될 수 있습니다.",
        en_a:
          "No. All PDF processing happens entirely inside your browser. Your files are never sent to any server — not even a single byte. Processing works even offline after the page loads.",
      },
      {
        q: "처리된 파일은 어디에 저장되나요?",
        en_q: "Where is my processed file stored?",
        a: "브라우저 메모리에서 처리된 결과는 즉시 로컬 다운로드됩니다. 서버 저장소나 클라우드에 파일을 보관하지 않습니다.",
        en_a:
          "The result is processed in browser memory and downloaded directly to your device. We do not store files on any server or cloud.",
      },
      {
        q: "민감 문서(계약서, 개인정보 등)를 안전하게 처리할 수 있나요?",
        en_q: "Is it safe to process sensitive documents?",
        a: "네. 파일이 외부로 나가지 않기 때문에 계약서·의료 기록·개인정보가 포함된 PDF도 안전하게 처리할 수 있습니다. 브라우저 탭을 닫으면 메모리도 해제됩니다.",
        en_a:
          "Yes. Since your files never leave your device, you can safely process contracts, medical records, and other sensitive documents. Closing the browser tab frees the memory.",
      },
    ],
  },
  {
    section: "무료 정책",
    en: "Pricing & Limits",
    items: [
      {
        q: "정말 무료인가요? 숨은 제한이 있나요?",
        en_q: "Is it really free? Are there hidden limits?",
        a: "네, 진짜 무료입니다. 횟수 제한·파일 용량 제한·유료 잠금·워터마크가 없습니다. 수익은 배너 광고(향후 Phase 3)로 운영할 예정입니다.",
        en_a:
          "Yes, truly free. There are no usage limits, file size limits, paywalls, or watermarks. Revenue will come from banner ads (planned for a future phase).",
      },
      {
        q: "파일 크기나 페이지 수 제한이 있나요?",
        en_q: "Is there a file size or page count limit?",
        a: "소프트 제한은 없습니다. 실질적 한계는 여러분의 기기 메모리(RAM)입니다. 대용량 파일(수백 페이지·수백 MB)은 처리 시간이 더 걸릴 수 있습니다.",
        en_a:
          "There are no soft limits. The only practical constraint is your device's RAM. Large files (hundreds of pages or hundreds of MB) may take longer to process.",
      },
      {
        q: "회원가입이나 로그인이 필요한가요?",
        en_q: "Do I need to sign up or log in?",
        a: "아니요. 가입·로그인 없이 즉시 사용할 수 있습니다.",
        en_a: "No. You can use all tools instantly without signing up or logging in.",
      },
    ],
  },
  {
    section: "기능 & 호환성",
    en: "Features & Compatibility",
    items: [
      {
        q: "Word·PPT·Excel 같은 오피스 파일을 PDF로 변환할 수 있나요?",
        en_q: "Can I convert Word, PPT, or Excel files to PDF?",
        a: "오피스→PDF 변환은 서버 처리가 필요하기 때문에 제공하지 않습니다. 각 프로그램에서 「PDF로 저장」또는 「인쇄 → PDF」로 변환 후, 이 서비스에서 편집하세요.",
        en_a:
          "Office-to-PDF conversion requires server processing, which conflicts with our zero-upload architecture. Instead, use \"Save as PDF\" or \"Print → PDF\" in your office app, then edit the resulting PDF here.",
      },
      {
        q: "모바일(스마트폰·태블릿)에서도 사용할 수 있나요?",
        en_q: "Does it work on mobile devices?",
        a: "네, 모바일 브라우저에서도 동작합니다. 단, 대용량 파일이나 PDF 작업실의 드래그 편집은 PC 환경이 더 편리합니다.",
        en_a:
          "Yes, it works in mobile browsers. However, large files and drag-and-drop editing in the PDF Workbench are more comfortable on a desktop.",
      },
      {
        q: "어떤 브라우저를 지원하나요?",
        en_q: "Which browsers are supported?",
        a: "Chrome, Edge, Firefox, Safari 등 최신 브라우저를 모두 지원합니다. Internet Explorer는 지원하지 않습니다.",
        en_a:
          "All modern browsers are supported: Chrome, Edge, Firefox, Safari. Internet Explorer is not supported.",
      },
      {
        q: "암호로 보호된 PDF도 처리할 수 있나요?",
        en_q: "Can I process password-protected PDFs?",
        a: "현재는 암호 해제 기능을 제공하지 않습니다. 암호를 미리 해제한 PDF를 사용해주세요.",
        en_a:
          "Password removal is not currently supported. Please unlock your PDF with its password first using another tool.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            자주 묻는 질문
          </h1>
          <p className="text-sm text-zinc-500">FAQ · Frequently Asked Questions</p>
        </header>

        {faqs.map((section) => (
          <section key={section.section} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {section.section}
              </h2>
              <span className="text-[11px] text-zinc-300">{section.en}</span>
            </div>

            <div className="flex flex-col gap-4">
              {section.items.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
                >
                  <p className="text-sm font-medium text-zinc-900">{item.q}</p>
                  <p className="mt-1 text-[11px] text-zinc-400">{item.en_q}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.a}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 italic">
                    {item.en_a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
