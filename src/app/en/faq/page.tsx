import { FaqPageContent } from "@/components/FaqPageContent";
import { enPageMetadata } from "@/lib/i18n/metadata";

export const metadata = enPageMetadata("/en/faq");

export default function EnglishFaqPage() {
  return <FaqPageContent locale="en" />;
}
