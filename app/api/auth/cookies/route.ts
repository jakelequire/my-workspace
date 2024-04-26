import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger'
import { NextResponse } from 'next/server';

const logger = new DebugLogger();


interface ResponseObj {
    status: number;
    message: string;
    value: string;
}

export async function GET(request: Request) {
    const cookie = cookies().get('session');
    if (cookie) {
        return new Response(
            JSON.stringify({
                status: 200,
                message: 'Signed in',
                value: cookie,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } else {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Not signed in',
                value: null,
            }),
            { status: 400 }
        );
    }
}


export async function POST(request: Request) {
    logger.endpointHit('[/api/auth/cookies]', 'POST');

    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    const userId = cookies().get('userId');
    const session = cookies().get('session');

    //
    // Delete the current userId cookie.
    //
    if(userId) {
        console.log("\n[POST /api/cookies] userId cookie deleted\n");
        cookies().delete('userId');
    } else {
        console.log("\n[POST /api/cookies] userId cookie not found\n");
        return NextResponse.redirect(new URL('/login').href);
    }

    //
    // Delete the current session cookie.
    //
    if(session) {
        console.log("\n[POST /api/logout] session cookie found\n")
        cookies().delete('session');
    } else {
        console.log("\n[POST /api/logout] session cookie not found\n")
        return NextResponse.redirect(new URL('/login').href);
    }



}



