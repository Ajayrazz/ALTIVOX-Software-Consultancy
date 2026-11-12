import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { logout } from "@/actions/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const s = await getSession(); // login page renders without a session; every other page calls requireAdmin()
  if (!s) return <>{children}</>;
  const newCount = await db.enquiry.count({ where: { status: "NEW" } });
  return <AdminShell email={s.email} newCount={newCount} logout={logout}>{children}</AdminShell>;
}
