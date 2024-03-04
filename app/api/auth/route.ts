'use server'
// /api/auth/route.ts
// An API route to validate signed in / signed out status

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { cookies } from 'next/headers';
import { InitApp } from '@/lib/firebase-admin-config';
import * as admin from 'firebase-admin';
import { serialize } from 'cookie';
//Initialize Firebase Admin
InitApp();

export async function GET(request: NextRequest) {
    console.log('\n<!>GET request to /api/auth<!>\n');
    const session = cookies().get('session')?.value || '';
    /**/ console.log('\n<!>session<!>\n', session);
    if (!session) {
        /**/ console.log('\n<!>No session cookie\n');
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        /**/ console.log('\n<!>No user\n');
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }
    return NextResponse.json({ isLogged: true }, { status: 200 });
}

type Data = {
    token: string;
};

// POST rewrite for Next.js API route
export async function POST(request: Request) {
    console.log('\n<!>POST request to /api/auth<!>\n');
    if (!request.body) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Extracting token from the body
    const extractTokenFromStream = await streamToJson(request.body).then((data) => {
        if(!data) {
            throw new Error('No token found');
        }
        return data as Data;
    });

    const token: string = extractTokenFromStream.token;

    console.log('\n[/api/auth = POST] <!>token<!>\n', token);
    try {
        // Verify token with Firebase Admin SDK
        const decodedToken = await verifyTokenWithFirebase(token);
        // Verify auth with Firebase Auth SDK
        // if(await validateWithFirebase()) {
        //     console.log('\n[/api/auth = POST] <!>validateWithFirebase<!>\n Successful!');
        // } else {
        //     console.log('\n[/api/auth = POST] <!>validateWithFirebase<!>\n Failed!');
        // }

        if(decodedToken) {
            console.log('\n[/api/auth = POST] <!>decodedToken<!>\n Successful!', decodedToken);
        } else {
            console.log('\n[/api/auth = POST] <!>decodedToken<!>\n Failed!', decodedToken);
        }

        // On success, set a cookie
        const serialized = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        cookies().set('testing', 'This is a test!')

        // SetHeader - 'set-cookie' - serialized
        cookies().set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        // Return success
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
}

async function verifyTokenWithFirebase(idToken: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('\n[/api/auth = POST] Token Successfully Received\n')
        return decodedToken;
    } catch (error) {
        console.error('Error verifying ID token:', error);
        throw error;
    }
}


async function streamToJson(stream: ReadableStream<Uint8Array>): Promise<unknown> {
    return await new Response(stream).json();
}

async function validateWithFirebase() {
    console.log('\n[/api/auth = POST] <!>validateWithFirebase<!>\n');
    const auth = getAuth();
    console.log('\n[/api/auth = POST] <!>auth<!>\n')
    const user = auth.currentUser;
    if (!user) {
        console.log('\n[/api/auth = POST] <!>No user found<!>\n')
        return false;
    }
    console.log('\n[/api/auth = POST] <!>User found<!>\n')
    return true;
}