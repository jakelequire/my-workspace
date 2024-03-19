import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function GET(request: Request) {
    // get the user ID from the cookie
    const userId = cookies().get('userId');
    if (!userId) {
        return NextResponse.json({ message: 'No user ID found in cookie' });
    }

    return NextResponse.json({ userId });
}


export async function POST(request: Request) {
    console.log('\n[/api/auth/user] Hello from POST');

    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    try {
        const requestBody = await request.json();
        // console.log("requestBody:", requestBody);
        const userId = requestBody.userId;
        if(!userId) {
            return NextResponse.json({ message: 'No user ID provided' });
        }
        // console.log('\nUser ID:\n', userId)
        // set the user ID in a cookie
        cookies().set('userId', userId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        });

        return NextResponse.json({ message: 'User ID set in cookie' });
    } catch(error) {
        console.error('Error parsing JSON body', error);
        return new Response(JSON.stringify({ message: 'Error parsing JSON body' }), {
            status: 400,
        });
    }
}
