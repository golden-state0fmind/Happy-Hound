import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const path = req.nextUrl.pathname;

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim(); // Cleaning CSP string

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const whitelistedRoutes = ['/', '/dogsitter', '/login', '/register'];
    if (whitelistedRoutes.includes(path)) {
        return NextResponse.next();
    }

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session && path === '/profile') {
        return NextResponse.redirect(new URL('/login', req.url));
    } else if (session && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    if (!session && path === '/addpet') {
        return NextResponse.redirect(new URL('/login', req.url));
    } else if (session && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL(`${path}`, req.url));
    }

    return NextResponse.next({
        headers: requestHeaders,
        request: { headers: requestHeaders },
    });
}