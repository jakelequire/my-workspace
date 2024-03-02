// app/api/login/route.ts
import * as admin from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { customInitApp } from '@/lib/firebase-admin-config';

customInitApp();

export async function POST(request: Request, response: NextResponse) {
    console.log("POST /api/login")
    const authorization = headers().get('Authorization');
    if (authorization?.startsWith('Bearer ')) {
        const idToken = authorization.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken)



        if (decodedToken) {
            //Generate session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn })
            const options = {
                name: 'session',
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            //Add the cookie to the browser
            cookies().set(options);
        }
    }

    return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest) {
    const session = cookies().get('session')?.value || '';

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    return NextResponse.json({ isLogged: true }, { status: 200 });
}
