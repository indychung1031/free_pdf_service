import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("/split");

export default function SplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
