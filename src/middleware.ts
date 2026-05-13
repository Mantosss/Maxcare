import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const token = request.cookies.get("token")?.value;
//   const role = request.cookies.get("role")?.value;

//   const isLoginPage = pathname === "/signin";
//   const isAdminRoute = pathname.startsWith("/admin");

//   if (isLoginPage && token) {
//     if (role === "admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }

//     if (role === "patient") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (role === "doctor") {
//       return NextResponse.redirect(new URL("/doctor/dashboard", request.url));
//     }
//   }

//   if (!token && request.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Redirect old role-specific dashboards to unified /dashboard
  const legacyDashboards = [
    "/admin/dashboard",
    "/doctor/dashboard",
    "/doctor/patients",
    "/patient/dashboard",
  ];
  if (legacyDashboards.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logged-in users hitting login/signup -> dashboard
  if (isAuthPage && token) {
    if (role === "admin" || role === "doctor")
      return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.redirect(new URL("/", request.url)); // Patients land on home
  }

  // Protect dashboard, profile, admin, doctor routes
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/doctor") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/patient/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
    "/",
  ],
};
