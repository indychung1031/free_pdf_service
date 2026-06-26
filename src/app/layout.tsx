import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminProvider } from "@/components/AdminProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SERVICE_NAME, SERVICE_TAGLINE, SITE_URL } from "@/lib/branding";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SERVICE_NAME,
    template: `%s | ${SERVICE_NAME}`,
  },
  description: SERVICE_TAGLINE,
  keywords: [
    "PDF 병합",
    "PDF 합치기",
    "PDF 분할",
    "PDF 페이지 삭제",
    "무료 PDF 편집",
    "서버 없이 PDF",
    "온라인 PDF 도구",
    "merge PDF free",
    "split PDF online",
    "PDF editor no upload",
    "client-side PDF",
    "free PDF tool no watermark",
  ],
  openGraph: {
    title: SERVICE_NAME,
    description: SERVICE_TAGLINE,
    type: "website",
    locale: "ko_KR",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AdminProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AdminProvider>
      </body>
    </html>
  );
}
