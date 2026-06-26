"use client";

import Link from "next/link";
import { useAdmin } from "@/components/AdminProvider";

export function AdminStatusLink() {
  const { isAdmin, loading } = useAdmin();

  if (loading || !isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-zinc-700"
      title="운영자 모드 — 광고 미노출"
    >
      Admin
    </Link>
  );
}
