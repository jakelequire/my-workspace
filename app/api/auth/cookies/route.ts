import { cookies } from 'next/headers';

interface ResponseObj {
    status: number;
    message: string;
    value: string;
}

export async function GET(request: Request) {
    const cookie = cookies().get('session');
    if (cookie) {
        return new Response(
            JSON.stringify({
                status: 200,
                message: 'Signed in',
                value: cookie,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } else {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Not signed in',
                value: null,
            }),
            { status: 400 }
        );
    }
}
