import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Don't redirect if it's a Next.js static file
    // Solution from https://www.reddit.com/r/nextjs/comments/15gzjwm/nextjs_middleware_redirect_not_serving_css/
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const session = request.cookies.get('session');
    const path = request.nextUrl.pathname;
    
    //Return to /login if don't have a session
    if (!session && path !== "/login") {
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
    }

    //Call the authentication endpoint
    const responseAPI = fetch(`${request.nextUrl.origin}/api/login`, {
        headers: {
            Cookie: `session=${session?.value}`,
        },
    }).then((response) => {
        if(response.status === 200) {
            return NextResponse.redirect(new URL('/login', request.url));

        }
    });

    responseAPI

    return NextResponse.next();
}

export const config = {
    matcher: [ '/', '/:pages*', '/home', '/login']
}
