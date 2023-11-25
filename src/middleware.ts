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

    const whitelistedPublicRoutes = ['/', '/dogsitter', '/login', '/register'];
    if (whitelistedPublicRoutes.includes(path)) {
        return NextResponse.next();
    }

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const whitelistedPrivateRoutes = ['/profile', '/addpet', '/editpet/*', '/editprofile'];
    if (!session && whitelistedPrivateRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else if (session && whitelistedPrivateRoutes.includes(path)) {
        return NextResponse.next();
    }

    return NextResponse.next({
        headers: requestHeaders,
        request: { headers: requestHeaders },
    });
}