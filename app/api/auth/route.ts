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


// POST rewrite for Next.js API route
export async function POST(request: Request) {
    const authorization = request.headers.get('Authorization');
    const token = authorization?.split('Bearer ')[1];
    console.log('\n[/api/auth = POST] Token: ', token);

    if(!token) {
        return NextResponse.json({ status: 400, body: 'No token found.' });
    }

    try {
        const decodedToken = await verifyTokenWithFirebase(token);
        console.log('\n[/api/auth = POST] Decoded Token: ', decodedToken);
        return NextResponse.json({ status: 200, body: 'User is verified' });
    } catch (error) {
        console.error('Error in verifying token:', error);
        return NextResponse.json({ status: 400, body: 'Error in verifying token.' });
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
