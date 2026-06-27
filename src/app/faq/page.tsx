import { FaqPageContent } from "@/components/FaqPageContent";
import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("/faq");

export default function FaqPage() {
  return <FaqPageContent locale="ko" />;
}
