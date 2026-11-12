import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "altivox_admin";
const key = () => {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ chars)");
  return new TextEncoder().encode(s);
};

export async function createSession(userId: string, email: string) {
  const token = await new SignJWT({ email }).setProtectedHeader({ alg: "HS256" }).setSubject(userId).setIssuedAt().setExpirationTime("7d").sign(key());
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 86400 });
}
export async function destroySession() { (await cookies()).delete(COOKIE); }
export async function getSession() {
  const t = (await cookies()).get(COOKIE)?.value;
  if (!t) return null;
  try { const { payload } = await jwtVerify(t, key()); return { userId: payload.sub!, email: String(payload.email) }; } catch { return null; }
}
