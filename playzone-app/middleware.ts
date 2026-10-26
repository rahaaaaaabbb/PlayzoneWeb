import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('playzone_role')?.value;
  const { pathname } = request.nextUrl;

  // Proteksi rute Admin & Owner
  if (pathname.startsWith('/dashboard')) {
    if (role !== 'ADMIN' && role !== 'OWNER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Proteksi rute Pelanggan
  if (pathname.startsWith('/ketersediaan') || pathname.startsWith('/reservasi')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Mencegah pengguna yang sudah login mengakses halaman login kembali
  if (pathname === '/login' && role) {
    if (role === 'ADMIN' || role === 'OWNER') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/ketersediaan', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/ketersediaan/:path*', '/reservasi/:path*', '/login'],
};