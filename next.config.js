/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // swcMinify: true,
    // async headers() {
    //     const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    //     const cspHeader = `
    //         default-src 'self';
    //         script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    //         style-src 'self' 'nonce-${nonce}';
    //         img-src 'self' blob: data:;
    //         font-src 'self';
    //         object-src 'none';
    //         base-uri 'self';
    //         form-action 'self';
    //         frame-ancestors 'none';
    //         block-all-mixed-content;
    //         upgrade-insecure-requests;
    //         `
    //         .replace(/\s{2,}/g, ' ')
    //         .trim(); // Cleaning CSP string

    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'X-Frame-Options',
    //                     value: 'DENY',
    //                 },
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value: cspHeader,
    //                 },
    //                 {
    //                     key: 'X-Content-Type-Options',
    //                     value: 'nosniff',
    //                 },
    //                 {
    //                     key: 'Permissions-Policy',
    //                     value: "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
    //                 },
    //                 {
    //                     key: 'Referrer-Policy',
    //                     value: 'origin-when-cross-origin',
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

module.exports = nextConfig;