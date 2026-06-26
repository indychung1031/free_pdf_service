import Image from "next/image";
import Link from "next/link";
import { SiteHeaderActions } from "@/components/SiteHeaderActions";
import { LOGO_ALT, LOGO_PATH, SERVICE_NAME } from "@/lib/branding";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
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
        <p className="max-w-[8rem] shrink-0 text-right text-[11px] leading-tight text-zinc-500 sm:max-w-none sm:text-xs">
          {SERVICE_NAME}
        </p>
      </div>
    </header>
  );
}
