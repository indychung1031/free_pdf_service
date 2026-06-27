import { AdminStatusLink } from "@/components/AdminStatusLink";
import { SiteHeaderNav } from "@/components/SiteHeaderNav";
import { SERVICE_NAME } from "@/lib/branding";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <SiteHeaderNav />
        <p className="max-w-[8rem] shrink-0 text-right text-[11px] leading-tight text-zinc-500 sm:max-w-none sm:text-xs">
          <span className="inline-flex items-center justify-end gap-1.5">
            <AdminStatusLink />
            {SERVICE_NAME}
          </span>
        </p>
      </div>
    </header>
  );
}
