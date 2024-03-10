import { NextResponse } from 'next/server';
import { Firestore } from '@/server/firestore/firestore';
import { Todo } from '@/types/types';

/* ----------------------------------- /
 * ################################### /
 *         GET /api/firestore          /
 * ################################### /
 * ----------------------------------- /
*/
export async function GET(request: Request) {
    console.log('[/api/firestore] Hello from GET');
    const firestoreService = new Firestore();
    const allTodoItems = await firestoreService.getAllTodoItems();

    return new Response(JSON.stringify(allTodoItems), {
        status: 200,
    });
}

/* ----------------------------------- /
 * ################################### /
 *         POST /api/firestore         /
 * ################################### /
 * ----------------------------------- /
*/
export async function POST(request: Request) {
    console.log('[/api/firestore] Hello from POST');
    const firestoreService = new Firestore();

    // Check if the request has a body
    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        const addTodoItem = await firestoreService.addTodoItem(requestBody as Todo.TodoItem);

        return new Response(JSON.stringify({...addTodoItem}), {
            status: 200,
        });
    } catch (error) {
        console.error('Error parsing JSON body', error);
        return new Response(JSON.stringify({ message: 'Error parsing JSON body' }), {
            status: 400,
        });
    }
}

/* ----------------------------------- /
 * ################################### /
 *         PUT /api/firestore          /
 * ################################### /
 * ----------------------------------- /
*/
export async function PUT(request: Request) {
    console.log('[/api/firestore] Hello from PUT');
    const firestoreService = new Firestore();

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        await firestoreService.updateTodoItem(requestBody.id, requestBody.editedItem);

        return new Response(JSON.stringify({ message: 'Item updated successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error parsing JSON body', error);
        return new Response(JSON.stringify({ message: 'Error parsing JSON body' }), {
            status: 400,
        });
    }
}

/* ----------------------------------- /
 * ################################### /
 *        DELETE /api/firestore        /
 * ################################### /
 * ----------------------------------- /
*/
export async function DELETE(request: Request) {
    console.log('[/api/firestore] Hello from DELETE');
    const firestoreService = new Firestore();

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        console.log(requestBody);

        // Assuming you want to do something with the parsed body,
        // like deleting it from Firestore:
        // await firestoreService.deleteTodoItem(requestBody.id);
        await firestoreService.deleteTodoItem(requestBody.id);
        /*DEBUG*/ console.log("[/api/firestore] Deleted Item ID: ", requestBody.id)

        return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error parsing JSON body', error);
        return new Response(JSON.stringify({ message: 'Error parsing JSON body' }), {
            status: 400,
        });
    }
}
