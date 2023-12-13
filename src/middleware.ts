import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/propose')) {
    return NextResponse.rewrite(new URL('/admin/propose/list', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/admin/contact')) {
    return NextResponse.rewrite(new URL('/admin/contact/list', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/admin/police')) {
    return NextResponse.rewrite(new URL('/admin/police/list', request.url))
  }
}
 