import type { Locale } from "@/lib/i18n/locale";
import { FAQ_SECTIONS } from "@/lib/i18n/content/faq";

type FaqPageContentProps = {
  locale: Locale;
};

export function FaqPageContent({ locale }: FaqPageContentProps) {
  const en = locale === "en";

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {en ? "Frequently Asked Questions" : "자주 묻는 질문"}
          </h1>
          <p className="text-sm text-zinc-500">
            {en ? "FAQ · Innovo Free PDF solution" : "FAQ · Frequently Asked Questions"}
          </p>
        </header>

        {FAQ_SECTIONS.map((section) => (
          <section key={section.section} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {en ? section.en : section.section}
              </h2>
              {!en && (
                <span className="text-[11px] text-zinc-300">{section.en}</span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {section.items.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
                >
                  <p className="text-sm font-medium text-zinc-900">
                    {en ? item.en_q : item.q}
                  </p>
                  {!en && (
                    <p className="mt-1 text-[11px] text-zinc-400">{item.en_q}</p>
                  )}
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      en ? "text-zinc-600" : "text-zinc-600"
                    }`}
                  >
                    {en ? item.en_a : item.a}
                  </p>
                  {!en && (
                    <p className="mt-2 text-xs italic leading-relaxed text-zinc-400">
                      {item.en_a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
