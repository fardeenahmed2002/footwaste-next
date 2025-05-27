import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const collectorRoutes = ['/collector'];
  const isCollectorRoute = collectorRoutes.some(route => pathname.startsWith(route));

  if (!isCollectorRoute) {
    return NextResponse.next(); // Not protected
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ⚠️ কোনো DB বা JWT verification এখানে করো না
  return NextResponse.next();
}

export const config = {
  matcher: ["/collector", "/collector/:path*"],
};
