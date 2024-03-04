import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const token = request.cookies.get('authToken');

    if (!token && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(token && request.nextUrl.pathname.startsWith("/login")) {
        console.log('\n<!>middleware<!>\n', token);
        return NextResponse.redirect(new URL('/', request.url))
    } else {
        console.log("No token found in cookies")
    }

    return NextResponse.next();
}
