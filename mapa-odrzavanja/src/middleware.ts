import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTvUserAgent(ua: string): boolean {
  const value = ua.toLowerCase();
  return (
    value.includes("vidaa") ||
    value.includes("hisense") ||
    value.includes("smart-tv") ||
    value.includes("smarttv") ||
    value.includes("tizen") ||
    value.includes("webos") ||
    value.includes("hbbtv") ||
    value.includes("netcast") ||
    value.includes("bravia") ||
    value.includes("appletv") ||
    value.includes("googletv")
  );
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/tv")) {
    const res = NextResponse.next();
    // Radi i bez JS-a na starim TV browserima
    res.headers.set("Refresh", "60");
    return res;
  }

  if (pathname !== "/") {
    return NextResponse.next();
  }

  if (searchParams.get("desktop") === "1" || searchParams.get("tv") === "0") {
    return NextResponse.next();
  }

  if (searchParams.get("tv") === "1" || searchParams.get("tv") === "true") {
    const url = request.nextUrl.clone();
    url.pathname = "/tv";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const ua = request.headers.get("user-agent") || "";
  if (isTvUserAgent(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = "/tv";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tv", "/tv/:path*"],
};
