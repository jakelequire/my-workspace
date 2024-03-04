// app/api/login/route.ts
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase/auth';
import { cookies, headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { InitApp } from '@/lib/firebase-admin-config';
console.log('POST /api/login !!! ');

//Initialize Firebase Admin
InitApp();
console.log('\n! ! Firebase Admin initialized ! ! \n');
export async function POST(request: Request, response: NextResponse) {
    const authorization = request.headers.get('Authorization');

    if (authorization?.startsWith('Bearer ')) {
        try {
            const idToken = authorization.split('Bearer ')[1];
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
            return new Response(JSON.stringify({ isLogged: true }), {
                status: 200,
                headers: {
                    'Set-Cookie': `session=${sessionCookie}; Max-Age=${expiresIn}; HttpOnly; Path=/; Secure`,
                },
            });
        } catch (error) {
            console.error('Error creating session cookie:', error);
            return new Response(JSON.stringify({ error: 'Failed to create session cookie' }), {
                status: 401,
            });
        }
    }

    return new Response(JSON.stringify({ error: 'Authorization header missing or invalid' }), {
        status: 401,
    });
}

export async function GET(request: NextRequest) {
    console.log('\n! ! ! !GET /api/login ! ! ! !\n');
    const session = cookies().get('session')?.value || '';
    console.log('\n<!>session<!>\n\n', session);
    //Validate if the cookie exist in the request
    if (!session) {
        console.log('\n<!>No session cookie\n');
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(session, true);
    console.log('\n<!>decodedClaims<!>\n', decodedClaims);
    if (!decodedClaims) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    return NextResponse.json({ isLogged: true }, { status: 200 });
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
