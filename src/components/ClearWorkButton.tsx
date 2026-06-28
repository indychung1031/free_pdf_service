"use client";

import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";

type ClearWorkButtonProps = {
  onClear: () => void;
  disabled?: boolean;
};

export function ClearWorkButton({ onClear, disabled }: ClearWorkButtonProps) {
  const t = getToolsContent(useLocale()).common;

  return (
    <div className="flex flex-col items-stretch gap-1 sm:items-end">
      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        title={t.clearWorkTitle}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t.clearWork}
      </button>
      <p className="text-center text-[11px] text-zinc-400 sm:text-right">
        {t.clearWorkHint}
      </p>
    </div>
  );
}
