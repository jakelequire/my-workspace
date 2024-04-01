import { cookies } from 'next/headers';
import { DebugLogger } from "@/lib/logger/debuglogger";





export async function POST(request: Request) {
    logger.endpointHit('/api/cache', 'POST')

    // if (!request.body) {
    //     return new Response(JSON.stringify("No Body Provided"))
    // }

    // try {
    //     const requestBody = await request.json();
    // 
    // } catch (error) {
    //
    // }

    return new Response(JSON.stringify("Hello, world!"))
}
