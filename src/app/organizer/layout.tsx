import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지 Organizer",
  description: "PDF 작업실로 이동합니다.",
  robots: { index: false, follow: true },
};

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
