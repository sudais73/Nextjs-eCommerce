import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;       // normal user token
  const adminToken = request.cookies.get("adminToken")?.value; // admin token

  const isAuthPage = path === "/auth";
  const isAdminLoginPage = path === "/admin/login";
  const isAdminPage = path.startsWith("/admin") && !isAdminLoginPage;

  // ✅ Handle ADMIN routes
  if (isAdminLoginPage) {
    // if already logged in as admin → go to dashboard
    if (adminToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next(); // allow reaching /admin/login
  }

  if (isAdminPage) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next(); // allow admin if token exists
  }

  // ✅ Handle USER routes
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth"], // protect admin + auth
};
