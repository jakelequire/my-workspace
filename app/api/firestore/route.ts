import { NextResponse } from "next/server";
import { Firestore } from "@/server/firestore/firestore";

// Usage:
// const firestoreService = new Firestore();
// firestoreService.addTodoItem({ title: "Learn Firestore", description: "Understand how Firestore works", completed: false, status: 'not started', started: '2021-01-01', due: '2021-01-10' });


export async function POST(request: Request, response: NextResponse) {
    console.log("Hello from POST");
    const firestoreService = new Firestore();
    if(!request.body) { return NextResponse.json({ message: "No body provided" }) }
    const requestBody = streamToArrayBuffer(request.body);

    console.log(requestBody);
    return NextResponse.json({ message: "Hello from POST" });
}

export async function streamToArrayBuffer(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
    return new Uint8Array(await new Response(stream).arrayBuffer());
 }