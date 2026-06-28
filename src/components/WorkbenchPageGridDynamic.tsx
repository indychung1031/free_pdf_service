"use client";

import dynamic from "next/dynamic";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";

function WorkbenchGridLoading() {
  const w = getToolsContent(useLocale()).workbench;
  return (
    <p className="py-8 text-center text-sm text-zinc-500">{w.thumbnailsLoading}</p>
  );
}

export const WorkbenchPageGrid = dynamic(
  () =>
    import("@/components/WorkbenchPageGrid").then((mod) => mod.WorkbenchPageGrid),
  {
    ssr: false,
    loading: WorkbenchGridLoading,
  },
);
