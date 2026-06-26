"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type AdminContextValue = {
  isAdmin: boolean;
  configured: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (passphrase: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await res.json()) as { admin?: boolean; configured?: boolean };
      setIsAdmin(Boolean(data.admin));
      setConfigured(data.configured !== false);
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function login(passphrase: string): Promise<string | null> {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passphrase }),
    });
    const data = (await res.json()) as { error?: string; admin?: boolean };
    if (!res.ok) return data.error ?? "인증에 실패했습니다.";
    setIsAdmin(Boolean(data.admin));
    setConfigured(true);
    return null;
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setIsAdmin(false);
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, configured, loading, refresh, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
}
