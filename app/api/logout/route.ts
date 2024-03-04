// /api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { cookies } from 'next/headers';
import { InitApp } from '@/lib/firebase-admin-config';

InitApp();

export function POST(request: Request) {
    console.log('\n<!>POST request to /api/logout<!>\n');
    const session = cookies().get('authToken')?.value || '';
    console.log('\n<!>session<!>\n', session);
    if (!session) {
        console.log('\n<!>No session cookie\n');
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        console.log('\n<!>No user\n');
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    auth.signOut().then(() => {
        console.log('\n<!>User signed out<!>\n');
        cookies().delete('authToken');
        return NextResponse.json({ success: true }, { status: 200 });
    }).catch((error) => {
        console.log('\n<!>Error in signOut<!>\n', error);
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    });

}