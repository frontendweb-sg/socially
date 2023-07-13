import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.nextauth.token;

    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(
        new URL("/signin?message=only admin can access this page", req.url)
      );
    }

    if (pathname.startsWith("/admin") && token?.role === "user") {
      return NextResponse.redirect(new URL("/user", req.url));
    }

    if (pathname.startsWith("/user") && token?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (pathname.startsWith("/user") && token?.role !== "user") {
      return NextResponse.redirect(
        new URL(
          encodeURI("/signin?message=only user can access this page"),

          req.url
        )
      );
    }
  },

  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
