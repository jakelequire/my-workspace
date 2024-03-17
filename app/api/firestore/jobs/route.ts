


export async function GET(request: Request) {
    const foo = { message: 'Hello from GET' };
    return new Response(JSON.stringify(foo), {
        status: 200,
    });
}
