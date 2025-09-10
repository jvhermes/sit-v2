import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch (err) {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/') {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)) 
  }

  const payload = await verifyJwt(token)
  if (!payload) {
    return NextResponse.redirect(new URL('/', req.url)) 
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api|static|favicon.ico).*)',
  ],
}
