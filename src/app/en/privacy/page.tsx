import { enPageMetadata } from "@/lib/i18n/metadata";

export const metadata = enPageMetadata("/en/privacy");

export default function EnglishPrivacyPage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-zinc-500">Last updated: 2026-06-26 (beta draft)</p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-amber-50 px-6 py-4">
          <p className="text-sm font-medium text-amber-800">Beta notice</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-700">
            The service is currently in a non-commercial beta (Phase 2) without ads. Before
            commercial launch (Phase 3), this policy will be updated for ads and cookies.
          </p>
        </div>

        <section className="flex flex-col gap-6 text-sm text-zinc-600">
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">1. Overview</h2>
            <p className="leading-relaxed">
              Innovo Free PDF solution processes PDFs <strong>entirely in your browser</strong>.
              We do not receive, store, or transmit your PDF file contents.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">2. What we collect</h2>
            <ul className="list-inside list-disc space-y-1 leading-relaxed">
              <li>PDF files: <strong>not collected</strong></li>
              <li>Account data: none (no sign-up required)</li>
              <li>Hosting access logs (IP, User-Agent): standard CDN/hosting logs only</li>
              <li>Advertising cookies: none in beta; planned for Phase 3 with prior notice</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">3. Third parties</h2>
            <p className="leading-relaxed">
              Static hosting (Vercel / AWS CloudFront in production) may log requests. Google
              AdSense may be added in a future phase under a separate notice.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">4. Contact</h2>
            <p className="leading-relaxed">
              For questions, contact the service operator. Material changes will be announced
              on this site before they take effect.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
