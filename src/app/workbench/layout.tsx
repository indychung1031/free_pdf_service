import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF 작업실 — 합치기·삭제·순서 변경",
  description:
    "PDF 여러 개를 한 화면에서 합치고, 페이지를 삭제·재배열·회전한 뒤 하나의 PDF로 저장합니다. 브라우저에서만 처리됩니다.",
};

export default function WorkbenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
