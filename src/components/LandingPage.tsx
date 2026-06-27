import Link from "next/link";
import type { Locale } from "@/lib/i18n/locale";
import { getLandingContent } from "@/lib/i18n/content/landing";

type LandingPageProps = {
  locale: Locale;
};

export function LandingPage({ locale }: LandingPageProps) {
  const c = getLandingContent(locale);

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{c.heroTitle}</h1>
          <p className="text-base leading-7 text-zinc-600">{c.heroSubtitle}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {c.features.map((f) => (
              <span
                key={f.label}
                className="inline-flex flex-col rounded-xl border border-zinc-200 bg-white px-4 py-2 shadow-sm"
              >
                <span className="text-sm font-medium text-zinc-900">{f.label}</span>
                <span className="text-[11px] text-zinc-400">{f.sublabel}</span>
              </span>
            ))}
          </div>
        </header>

        {c.toolUiNotice && (
          <p className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-600">
            {c.toolUiNotice}
          </p>
        )}

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {c.toolsHeading}
          </h2>
          <div className="grid gap-3">
            {c.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition hover:border-zinc-300 hover:shadow"
              >
                <h3 className="text-lg font-medium">{tool.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {c.whyHeading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.features.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-zinc-900">{f.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {c.faqHeading}
          </h2>
          <div className="flex flex-col gap-4">
            {c.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
              >
                <p className="text-sm font-medium text-zinc-900">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href={c.faqHref}
              className="text-xs text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-900 hover:underline"
            >
              {c.faqLink}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
