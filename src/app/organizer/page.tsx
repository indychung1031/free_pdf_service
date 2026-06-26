import { permanentRedirect } from "next/navigation";

/** Phase 1.6c: Organizer → PDF 작업실 통합 (§4.8.5) */
export default function OrganizerRedirectPage() {
  permanentRedirect("/workbench");
}
