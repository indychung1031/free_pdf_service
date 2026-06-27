import { enPageMetadata } from "@/lib/i18n/metadata";

export const metadata = enPageMetadata("/en/terms");

export default function EnglishTermsPage() {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-zinc-500">Last updated: 2026-06-26 (beta draft)</p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-amber-50 px-6 py-4">
          <p className="text-sm font-medium text-amber-800">Beta notice</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-700">
            Ads and revised terms will apply at commercial launch (Phase 3). We will notify
            users in advance.
          </p>
        </div>

        <section className="flex flex-col gap-6 text-sm text-zinc-600">
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">1. Service</h2>
            <p className="leading-relaxed">
              Innovo Free PDF solution provides client-side PDF tools (merge, split, delete
              pages, insert, workbench). Processing happens in your browser; files are not
              uploaded to our servers.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">2. Free use</h2>
            <p className="leading-relaxed">
              All features are free. There are no usage caps, paywalls, or watermarks on output
              PDFs. Revenue may come from banner ads in a future phase.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">3. Disclaimer</h2>
            <p className="leading-relaxed">
              The service is provided &quot;as is&quot;. You are responsible for backing up your
              documents. We are not liable for data loss caused by browser or device limits.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-zinc-900">4. Acceptable use</h2>
            <p className="leading-relaxed">
              Do not use the service for unlawful purposes. Automated abuse that degrades
              hosting for others is prohibited.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
