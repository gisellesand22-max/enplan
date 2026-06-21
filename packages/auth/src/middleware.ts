import { createServerClient } from '@supabase/ssr'
import type { NextRequest, NextResponse } from 'next/server'

export function createAuthMiddleware(protectedPaths: string[] = ['/']) {
  return async function middleware(request: NextRequest, response: NextResponse) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isProtected = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtected && !user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return Response.redirect(loginUrl)
    }

    return response
  }
}
