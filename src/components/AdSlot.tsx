"use client";

import { useAdmin } from "@/components/AdminProvider";

type AdSlotProps = {
  /** Phase 3 AdSense 슬롯 ID (예: footer-banner) */
  slot?: string;
  className?: string;
};

/** Phase 3 광고 슬롯 — Admin 화이트리스트 시 미렌더 (§6.3, §7.2) */
export function AdSlot({ slot = "default", className }: AdSlotProps) {
  const { isAdmin, loading } = useAdmin();

  if (loading || isAdmin) return null;

  return (
    <aside
      className={`hidden rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-xs text-zinc-400 ${className ?? ""}`}
      data-ad-slot={slot}
      aria-hidden
    >
      광고 영역 (Phase 3)
    </aside>
  );
}
