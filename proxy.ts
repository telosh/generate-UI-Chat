import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export function proxy(request: NextRequest) {
  const geo = geolocation(request);
  const city = encodeURIComponent(geo.city ?? "World");
  const country = geo.country ?? "Global";

  const response = NextResponse.next();
  response.headers.set("x-visitor-city", city);
  response.headers.set("x-visitor-country", country);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
