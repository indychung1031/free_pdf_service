import { LandingPage } from "@/components/LandingPage";
import { koPageMetadata } from "@/lib/i18n/metadata";

export const metadata = koPageMetadata("");

export default function Home() {
  return <LandingPage locale="ko" />;
}
