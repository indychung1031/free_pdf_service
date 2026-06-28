import { AdminStatusLink } from "@/components/AdminStatusLink";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { SiteHeaderNav } from "@/components/SiteHeaderNav";
import { SERVICE_NAME } from "@/lib/branding";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto grid w-full max-w-2xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <SiteHeaderNav />
        <p className="px-1 text-center text-[11px] leading-tight text-zinc-500 sm:text-xs">
          {SERVICE_NAME}
        </p>
        <div className="flex items-center justify-end gap-2">
          <AdminStatusLink />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
