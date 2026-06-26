import type { Metadata } from "next";
import AdminLoginPage from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "운영자 인증",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminLoginPage />;
}
