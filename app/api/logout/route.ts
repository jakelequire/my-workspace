// /api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function POST(request: Request) {
    console.log('\n<!>POST request to /api/logout<!>\n');

    cookies().delete('session');
    cookies().delete('userId');

    return NextResponse.json({ success: true });
}

