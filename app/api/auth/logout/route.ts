// /api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function POST(request: Request) {
    console.log('\n<!>POST request to /api/logout<!>\n');


    const checkUserIdCookie = () => {
        const userId = cookies().get('userId');
        if(userId) {
            cookies().delete('userId');
            console.log("\n[POST /api/logout] userId cookie deleted\n")
        } else {
            console.log("\n[POST /api/logout] userId cookie not found\n")
            return NextResponse.redirect(new URL('/login').href);
        }
    }

    const checkSessionCookie = () => {
        const session = cookies().get('session');
        if(session) {
            console.log("\n[POST /api/logout] session cookie found\n")
            cookies().delete('session');
        } else {
            console.log("\n[POST /api/logout] session cookie not found\n")
            return NextResponse.redirect(new URL('/login').href);
        }
    }

    checkUserIdCookie();
    checkSessionCookie();

    return new Response(JSON.stringify({ message: 'Logged out' }));
}

