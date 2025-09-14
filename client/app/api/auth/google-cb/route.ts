import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const backendUrl = `${env.API_URL}/auth/google/callback${req.nextUrl.search}`;

    const res = await fetch(backendUrl, {
      method: "GET",
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    const rawCookies = res.headers.get("set-cookie");
    if (rawCookies) responseHeaders.set("set-cookie", rawCookies);

    let redirectUrl = "/login?message=fail 1";
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      const location = res.headers.get("location")!;

      try {
        const url = new URL(location);
        const pathWithQuery = url.pathname + url.search;

        if (url.pathname.startsWith("/u/")) {
          redirectUrl = url.pathname; // Just path for success
        } else {
          redirectUrl = pathWithQuery; // Path + query for errors
        }
      } catch {
        redirectUrl = "/login?message=parsing error";
      }
    }
    // let redirectUrl = "/login?message=fail 1"; // default fallback
    // if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
    //   const location = res.headers.get("location")!;
    //   const pathname = new URL(location, env.API_URL).pathname;
    //   redirectUrl = pathname.startsWith("/u/")
    //     ? pathname
    //     : (redirectUrl = location.replace(env.API_URL!, ""));
    // }

    return NextResponse.redirect(new URL(redirectUrl, req.url), {
      headers: responseHeaders,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.redirect(
      new URL("/login?message=callback failed", req.url)
    );
  }
}
