import { AdSlot } from "@/components/AdSlot";
import { SiteFooterLinks } from "@/components/SiteFooterLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6">
        <AdSlot slot="footer" className="mx-auto w-full max-w-xl" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SiteFooterLinks />
        </div>
      </div>
    </footer>
  );
}
