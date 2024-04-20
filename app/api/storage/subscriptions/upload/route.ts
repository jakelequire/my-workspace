import FinanceService from '@/server/firestore/financeService';
import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger'


const logger = new DebugLogger();

export async function POST(request: Request) {
    logger.endpointHit('[/api/storage/subscriptions/upload]', 'POST')

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }));
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const financeService = new FinanceService();
    financeService.setUserId(userId.value);

    try {
        const body = await request.arrayBuffer();
        console.log("{DEBUG} [POST] body: ", body)
        const data = await financeService.pfpUpload(body);
        console.log("{DEBUG} [POST] data: ", data)

        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
