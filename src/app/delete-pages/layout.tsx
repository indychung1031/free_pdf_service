import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("/delete-pages");

export default function DeletePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
