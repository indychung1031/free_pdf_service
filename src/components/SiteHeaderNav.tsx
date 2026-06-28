"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeaderActions } from "@/components/SiteHeaderActions";
import { homeHref, isEnglishPath } from "@/lib/i18n/locale";
import { LOGO_ALT, LOGO_PATH } from "@/lib/branding";

export function SiteHeaderNav() {
  const pathname = usePathname();
  const locale = isEnglishPath(pathname) ? "en" : "ko";

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <Link
        href={homeHref(locale)}
        className="inline-flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
      >
        <Image
          src={LOGO_PATH}
          alt={LOGO_ALT}
          width={168}
          height={48}
          className="h-9 w-auto sm:h-10"
          priority
        />
      </Link>
      <SiteHeaderActions />
    </div>
  );
}
