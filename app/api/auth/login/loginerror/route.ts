import { cookies } from 'next/headers';
import { DebugLogger } from "@/lib/logger/debuglogger";

const logger = new DebugLogger();


export async function POST(request: Request) {
    logger.endpointHit('\n[/api/login/loginerror]', 'POST');

    const checkSessionCookie = () => {
        const session = cookies().get('session');
        if(session) {
            cookies().delete('session');
        }
    }

    const checkUserIdCookie = () => {
        const userId = cookies().get('userId');
        if(userId) {
            cookies().delete('userId');
        }
    }

    checkSessionCookie();
    checkUserIdCookie();
}
