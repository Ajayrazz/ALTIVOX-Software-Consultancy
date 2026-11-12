import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { db } from "./db";

/** Call at the top of every admin page and action. Verifies signature AND that the user still exists. */
export async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  const user = await db.user.findUnique({ where: { id: s.userId }, select: { id: true, email: true } });
  if (!user) redirect("/admin/login");
  return user;
}
