// /api/login/route.ts
import * as admin from 'firebase-admin';
import { cookies } from 'next/headers';
import { InitApp } from '@/lib/firebase-admin-config';
import { NextResponse } from 'next/server';
import { DebugLogger } from '@/lib/logger/debuglogger';

const logger = new DebugLogger();

//Initialize Firebase Admin
InitApp();

export async function POST(request: Request) {
    logger.endpointHit('\n[/api/login]', 'POST');

    const authorization = request.headers.get('Authorization');
    // Note: Need this type information for BrowserCookies class *important*
    const token = authorization?.split('Bearer ')[1];

    /*DEBUG*/ console.log("\n[POST /api/login] token: ", token);

    const checkUserIdCookie = () => {
        const userId = cookies().get('userId');
        if(userId) {
            cookies().delete('userId');
        }
    }

    const checkSessionCookie = () => {
        const session = cookies().get('session');
        if(session) {
            cookies().delete('session');
        }
    }

    try {
        if(!token) {
            cookies().delete('session');
            new Error('No token provided');
            return new Response(JSON.stringify({ message: 'No token provided' }));
        }

        // Note: Need this type information for BrowserCookies class *important*
        const decodedToken = await admin.auth().verifyIdToken(token)

        /*DEBUG*/ console.log("\n[POST /api/login] decodedToken: ", decodedToken);

        checkUserIdCookie();
        checkSessionCookie();


        // decodedToken.uid is what will be being passed to the new Browser Cookies class.
        cookies().set('userId', decodedToken.uid, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        })

        cookies().set('session', token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        })
        
        return NextResponse.redirect(new URL('/').href);
    } catch (error) {
        /*DEBUG*/ console.log("\n[POST /api/login] error: ", error);
        return new Response(JSON.stringify({ message: 'Token verification failed', error: error }));
    }
}
