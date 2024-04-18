import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger'
import FinanceService from '@/server/firestore/financeService';

const logger = new DebugLogger();


export async function GET(request: Request) {
    logger.endpointHit('[/api/firestore/finances/budgeting]', 'GET')

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const financeService = new FinanceService();
    financeService.setUserId(userId.value);

    try {
        const subscriptionItems = await financeService.getSubscriptionItems();
        return new Response(JSON.stringify(subscriptionItems), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}


export async function POST(request: Request) {
    logger.endpointHit('[/api/firestore/finances/budgeting]', 'POST')

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
        const item = await request.json();
        console.log("{DEBUG} [POST] /api/firestore/finances/budgeting", item)
        if (!item) {
            return new Response(JSON.stringify({ message: 'No item provided' }), {
                status: 400,
            });
        }
        const subscriptionItem = await financeService.addSubscriptionItem(item);
        return new Response(JSON.stringify(subscriptionItem), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
