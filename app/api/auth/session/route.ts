import { NextResponse } from 'next/server'

export async function GET() {
    const exampleData = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await exampleData.json();
    
    return NextResponse.json({ data });
}
