import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("MIDDLEWARE FIRED")

    const session = request.cookies.get('session');
    //Return to /login if don't have a session
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
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

    return responseAPI;

    return NextResponse.next();
}

//Add your protected routes
export const config = {
    matcher: ['/'],
};
