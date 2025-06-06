import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    const { pathname } = request.nextUrl

    if ((pathname.startsWith('/collector'))) {
      if (payload.role === 'collector' && payload.isVerified) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/pageNotFound', request.url))
      }
    }

    if ((pathname.startsWith('/user')) || (pathname.startsWith('/pages/foodDetails')) || (pathname.startsWith('/pages/editfood'))) {
      if (payload.role === 'user' && payload.role === 'donor' && payload.isVerified) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/pageNotFound', request.url))
      }
    }

  } catch (err) {
    console.error('Invalid token', err.message)
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/collector/:path*', '/user/:path*', '/admin/:path*', '/donor/:path*', '/pages/foodDetails/:path*','/pages/editfood/:path*'],
}
