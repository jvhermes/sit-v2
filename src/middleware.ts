import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { perfil?: string }
  } catch (err) {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl



  const token = req.cookies.get('token')?.value
  const payload = token ? await verifyJwt(token) : null
  const perfil = payload?.perfil


  if (pathname === '/') {
    if (!perfil) return NextResponse.next()

    if (perfil === 'ADMIN' || perfil === 'PREFEITURA') {
      return NextResponse.redirect(new URL('/prefeitura', req.url))
    }
    if (perfil === 'CARTORIO') {
      return NextResponse.redirect(new URL('/cartorio', req.url))
    }
    return NextResponse.next()
  }


  if (pathname.startsWith('/private')) {
    if (!perfil) {
      return NextResponse.redirect(new URL('/', req.url))
    }


    if (pathname.startsWith('/private/descricao') || pathname.startsWith('/perfil')) {
      return NextResponse.next()
    }

    if (pathname.startsWith('/private/admin') && perfil !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (pathname.startsWith('/private/prefeitura') && perfil !== 'PREFEITURA' && perfil !== 'ADMIN') {
      return NextResponse.redirect(new URL('/private/cartorio', req.url))
    }

    if (pathname.startsWith('/private/cartorio') && perfil !== 'CARTORIO' && perfil !== 'ADMIN') {
      return NextResponse.redirect(new URL('/private/prefeitura', req.url))
    }
  }
  return NextResponse.next()

}

export const config = {
  matcher: [
    '/((?!_next|api|static|favicon.ico).*)',
  ],
}
