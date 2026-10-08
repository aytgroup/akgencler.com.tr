import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("google-site-verification: googled0c975bfa2ee0350", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
