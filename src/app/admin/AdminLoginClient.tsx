"use client";

import { useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { ToolLayout } from "@/components/ToolLayout";

export default function AdminLoginPage() {
  const { isAdmin, configured, loading, login, logout } = useAdmin();
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWorking(true);
    setError(null);
    const err = await login(passphrase);
    if (err) setError(err);
    else setPassphrase("");
    setWorking(false);
  }

  async function handleLogout() {
    setWorking(true);
    await logout();
    setWorking(false);
  }

  return (
    <ToolLayout
      title="운영자 인증"
      description="인증된 운영자는 광고 슬롯이 표시되지 않습니다. (Phase 3 AdSense 연동 시 적용)"
    >
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-zinc-500">상태 확인 중…</p>
        ) : !configured ? (
          <p className="text-sm text-amber-800">
            Vercel 환경 변수 <code className="text-xs">ADMIN_PASSPHRASE</code>가
            설정되지 않았습니다.
          </p>
        ) : isAdmin ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-green-700">
              운영자 모드가 활성화되어 있습니다. 광고 슬롯이 숨겨집니다.
            </p>
            <button
              type="button"
              onClick={handleLogout}
              disabled={working}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 disabled:opacity-50"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-zinc-700">운영자 암호</span>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                autoComplete="current-password"
                className="rounded-lg border border-zinc-300 px-3 py-2 outline-none ring-zinc-400 focus:ring-2"
              />
            </label>
            <button
              type="submit"
              disabled={working || !passphrase.trim()}
              className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:bg-zinc-300"
            >
              {working ? "확인 중…" : "인증"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        )}
      </section>
    </ToolLayout>
  );
}
