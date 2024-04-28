import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger';
import { NextResponse } from 'next/server';

const logger = new DebugLogger();

/* ---------------------------------------- /
 * ######################################## /
 *          GET /api/auth/cookies           /
 * ######################################## /
 * ---------------------------------------- /
 */
export async function GET(request: Request) {
    if (request.mode !== 'same-origin') {
        return new Response(JSON.stringify({ message: 'Invalid request, Same Origin Policy' }), {
            status: 400,
        });
    }

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

//
// Note: This route is to manage the cookies for the user.
// type CookieActions = 'clear_cookies' | 'clear_cache' | 'clear_local_db';
//
/* ---------------------------------------- /
 * ######################################## /
 *         POST /api/auth/cookies           /
 * ######################################## /
 * ---------------------------------------- /
 */
export async function POST(request: Request) {
    /**/ logger.endpointHit('[/api/auth/cookies]', 'POST');

    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    if (request.credentials !== 'same-origin') {
        return new Response(JSON.stringify({ message: 'Invalid request, Same Origin Policy' }), {
            status: 400,
        });
    }

    try {
        const session = cookies().get('session');
        if(session) {
            console.log("\n[<POST> /api/auth/cookies] session cookie deleted.\n")
            cookies().delete('session');
        } else {
            console.log("\n[<POST> /api/auth/cookies] session cookie not found.\n")
            return NextResponse.redirect(new URL('/login').href);
        }

        const userId = cookies().get('userId');
        if(userId) {
            console.log("\n[POST /api/logout] userId cookie deleted\n")
            cookies().delete('userId');
        } else {
            console.log("\n[POST /api/logout] userId cookie not found\n")
            return NextResponse.redirect(new URL('/login').href);
        }

        return new Response(
            JSON.stringify({
                status: 200,
                message: 'POST request successful',
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.log('ERROR: {/api/auth/cookies} POST request failed.\n', error);

        return new Response(
            JSON.stringify({
                status: 400,
                message: 'POST request failed',
            }),
            { status: 400 }
        );
    }
}
