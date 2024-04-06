import { DebugLogger } from "@/lib/logger/debuglogger";

const logger = new DebugLogger();


export async function GET(request: Request) {
    logger.endpointHit("/api/auth/microsoft", "GET");
    console.log("Request: ", request)
    const url = new URL(request.url);
    const params = url.searchParams;
    const code = params.get("code");

    console.log("Code: ", code);

    return new Response(JSON.stringify("Hello, world!"));
}


export async function POST(request: Request) {
    logger.endpointHit("/api/auth/microsoft", "POST");
    console.log("Request: ", request)

    return new Response(JSON.stringify("Hello, world!"));
}
