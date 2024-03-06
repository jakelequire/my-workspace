// /api/login/route.ts
import * as admin from 'firebase-admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { InitApp } from '@/lib/firebase-admin-config';
//Initialize Firebase Admin
InitApp();
/*DEBUG*/ console.log("\n[POST /api/login] Firebase Admin initialized");


export async function POST(request: Request, response: NextResponse) {
    const error = request.headers.get('error');
    /*DEBUG*/ console.log("\n[POST /api/login] error: ", error);
    if(error) {
        return NextResponse.json({ status: 400, body: 'Error in signing in.' });
    }

    const authorization = request.headers.get('Authorization');
    const token = authorization?.split('Bearer ')[1];
    /*DEBUG*/ console.log("\n[POST /api/login] token: ", token); //#Token is currently being received correctly
    if(!token) {
        cookies().delete('session');
        return NextResponse.json({ status: 400, body: 'No token found.' });
    } else {
        cookies().set('session', token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        /*DEBUG*/ console.log("\n[POST /api/login] decodedToken: ", decodedToken);
        return NextResponse.json({ status: 200, body: 'User is verified' });
    } catch (error) {
        /*DEBUG*/ console.log("\n[POST /api/login] error: ", error);
        return NextResponse.json({ status: 400, body: 'Error in verifying token.' });
    }
}