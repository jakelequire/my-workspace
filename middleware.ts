import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'; 
import { cookies } from 'next/headers';

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;

    // Check if the user is signed in
    const validate = await validateSessionCookie();
    console.log("\n[middleware.ts] validate: ", validate);
    if(!validate && nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.nextUrl).href);
    }

    if(validate && nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.nextUrl).href);
    }
}

async function validateSessionCookie(): Promise<boolean> {
    const sessionCookie = cookies().get('session');
    if(sessionCookie) {
        return true;
    } else {
        return false;
    }
}