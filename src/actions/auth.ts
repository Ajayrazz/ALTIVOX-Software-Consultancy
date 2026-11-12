"use server";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/session";
import { rateLimit } from "@/lib/ratelimit";

const DUMMY = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO3sV4yqf0u5f2WzvV5C5eS2k4n2G0T7e"; // equalises timing for unknown emails

export async function login(_p: { error?: string } | null, fd: FormData) {
  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!rateLimit(`login:${ip}`, 8, 15 * 60_000)) return { error: "Too many attempts. Try again later." };
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const password = String(fd.get("password") ?? "");
  const user = email ? await db.user.findUnique({ where: { email } }) : null;
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY);
  if (!user || !ok) return { error: "Invalid email or password." };
  await createSession(user.id, user.email);
  redirect("/admin");
}
export async function logout() { await destroySession(); redirect("/admin/login"); }
