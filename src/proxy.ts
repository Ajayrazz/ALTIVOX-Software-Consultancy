import { NextResponse, type NextRequest } from "next/server";

// Optimistic gate only: real verification happens in requireAdmin() on every admin page/action.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !req.cookies.get("altivox_admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
