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
        const body = await request.formData();
        console.log("{DEBUG} [POST] /api/storage/subscriptions/upload\n", body)
        const file = body.get('value');
        console.log("{DEBUG} [POST] /api/storage/subscriptions/upload\n", file)
        const data = await financeService.pfpUpload(file);
        console.log("{DEBUG} [POST] /api/storage/subscriptions/upload\n", data)
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}