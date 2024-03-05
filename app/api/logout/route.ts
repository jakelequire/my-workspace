// /api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, signOut} from 'firebase/auth';
import { cookies } from 'next/headers';
import { InitApp } from '@/lib/firebase-admin-config';


export async function POST(request: Request) {
    console.log('\n<!>POST request to /api/logout<!>\n');
    cookies().delete('session');
    const session = cookies().get('session')?.value || '';

    console.log('\n<!>session<!>\n', session);
    if (!session) {
        console.log('\n<!>No session cookie\n');
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const auth = getAuth();
    await signOut(auth).then(() => {
        console.log('\n<!>User signed out<!>\n');
        return NextResponse.json({ success: true });
    }).catch((error) => {
        console.log('\n<!>Error in signOut<!>\n', error);
        return NextResponse.json({ success: false, error: 'Error in signOut' }, { status: 500 });
    });
}