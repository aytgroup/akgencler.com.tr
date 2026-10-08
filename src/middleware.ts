import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Google verification dosyasını her konumda döndür
  if (pathname.includes("googled0c975bfa2ee0350.html")) {
    return new NextResponse("google-site-verification: googled0c975bfa2ee0350", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
