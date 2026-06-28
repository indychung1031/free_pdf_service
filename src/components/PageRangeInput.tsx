"use client";

import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { previewPageCount } from "@/lib/pdf/page-range";

type PageRangeInputProps = {
  value: string;
  onChange: (value: string) => void;
  pageCount: number | null;
  label?: string;
  placeholder?: string;
};

export function PageRangeInput({
  value,
  onChange,
  pageCount,
  label,
  placeholder,
}: PageRangeInputProps) {
  const { common: t } = getToolsContent(useLocale());
  const preview =
    pageCount !== null ? previewPageCount(value, pageCount) : null;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700">
        {label ?? t.pageRangeLabel}
        {pageCount !== null && (
          <span className="ml-2 font-normal text-zinc-500">
            {t.pageRangeTotal(pageCount)}
          </span>
        )}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t.pageRangePlaceholder}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2"
      />
      {value.trim() && pageCount !== null && (
        <p className="text-xs text-zinc-500">
          {preview !== null
            ? t.pageRangePreview(preview)
            : t.pageRangeInvalid}
        </p>
      )}
      <p className="text-xs text-zinc-400">{t.pageRangeHint}</p>
    </div>
  );
}
