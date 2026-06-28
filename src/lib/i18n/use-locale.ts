"use client";

import { usePathname } from "next/navigation";
import { isEnglishPath, type Locale } from "@/lib/i18n/locale";

export function useLocale(): Locale {
  const pathname = usePathname();
  return isEnglishPath(pathname) ? "en" : "ko";
}
