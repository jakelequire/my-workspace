import FinanceService from '@/server/firestore/financeService';
import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger'

interface FileData {
    id: string;
    url: string;
    file: File;
}

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

        let file: File | undefined = undefined;
        let id: string = '';
        let url: string = '';
        
        const entries = body.entries();
        let entry = entries.next();
        
        while (!entry.done) {
            const [key, value] = entry.value;
            console.log("{DEBUG} FormData Key:", key, "Value:", value);
        
            // Assign values based on the key
            if (key === 'file' && value instanceof File) {
                file = value;
            } else if (key === 'id' && typeof value === 'string') {
                id = value;
            } else if (key === 'url' && typeof value === 'string') {
                url = value;
            }
        
            entry = entries.next();
        }
        
        // After collecting all data, check if all are defined
        if(!file) {
            console.log("{DEBUG} [pfpUpload] No file provided");
            return new Response(JSON.stringify({ message: 'No file provided' }), {
                status: 400,
            });
        }
        
        // Now call the pfpUpload method with the collected data
        const data = await financeService.pfpUpload({ id, url, file });

        console.log("{DEBUG} [pfpUpload] data: ", data);

        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}

