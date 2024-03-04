import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as admin from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';

InitApp();

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('session');

    // Redirect to /login if there's no session cookie or it's invalid
    if (!sessionCookie || !await validateSessionCookie(sessionCookie)) {
        if (request.nextUrl.pathname !== "/login") {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        // If session is valid and request is for /login, redirect to home
        if (request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    return NextResponse.next();
}

async function validateSessionCookie(sessionCookie: string): Promise<boolean> {
    try {
        await admin.auth().verifySessionCookie(sessionCookie, true);
        return true; // Session cookie is valid
    } catch (error) {
        console.error('Session cookie validation failed:', error);
        return false; // Session cookie is invalid
    }
}

export const config = {
    matcher: ['/', '/:path*', '/home', '/login']
};