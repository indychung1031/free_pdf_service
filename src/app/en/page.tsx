import { LandingPage } from "@/components/LandingPage";
import { enPageMetadata } from "@/lib/i18n/metadata";

export const metadata = enPageMetadata("/en");

export default function EnglishHome() {
  return <LandingPage locale="en" />;
}
