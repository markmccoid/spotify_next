import { NextURL } from "next/dist/server/web/next-url";
// middleware.ts
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// import { isAuthValid } from "./lib/auth";

export async function middleware(req) {
  // Just try redirectin to login to see if we can even show that page
  //return NextResponse.redirect(new URL("/login", req.url));

  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathname = req.nextUrl.pathname;

  const response = await NextResponse.rewrite(new URL("/login", req.url));

  // allow request is following is true
  // Token exists or an authentication workflow is happening
  // let the request continue on
  //
  if (pathname.includes("/api/auth") || token) {
    // console.log("path 1", NextResponse.next());
    return undefined; //NextResponse.next();
  }

  if (!token && pathname != "/login") {
    console.log("path 2", token);
    const loginUrl = new URL("/login", req.url);
    //return NextResponse.next();
    return NextResponse.redirect(loginUrl);

    const url = req.nextUrl.clone();
    url.pathname = "/";
    // console.log("URL", url);
    // return NextResponse.rewrite(new URL("/login/", req.url));
    console.log("res", response.url.length);
    // return NextResponse.redirect();
    // return NextResponse.next();
    // const res = NextResponse.rewrite(url);
    return NextResponse.next();
  }
  console.log("Path 3");
  // If they don't have a token and they are NOT going to the login page redirect to the login page
  // This means that all other routes are protected, exept login
  // if (!token && pathname != "/login") {
  //   console.log("path 2");
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/login";
  //   console.log("URL", url);
  //   return NextResponse.rewrite(url);
  // }
}
