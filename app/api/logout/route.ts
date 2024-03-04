// /api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, signOut, onAuthStateChanged} from 'firebase/auth';
import { cookies } from 'next/headers';
import { InitApp } from '@/lib/firebase-admin-config';


export function POST(request: Request) {
    console.log('\n<!>POST request to /api/logout<!>\n');
    cookies().delete('authToken');
    const session = cookies().get('authToken')?.value || '';

    console.log('\n<!>session<!>\n', session);
    if (!session) {
        console.log('\n<!>No session cookie\n');
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
}