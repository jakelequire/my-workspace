import { NextResponse } from 'next/server';
import { Todo } from '@/types/types';
import { TodoService } from '@/server/firestore/todoService';
import { cookies } from 'next/headers';
import { DebugLogger } from '@/lib/logger/debuglogger'

const logger = new DebugLogger();

/* --------------------------------------- /
 * ####################################### /
 *         GET /api/firestore/todo         /
 * ####################################### /
 * --------------------------------------- /
*/
export async function GET(request: Request) {
    logger.endpointHit('[/api/firestore/todo]', 'GET')

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }
    const todoService = new TodoService();
    todoService.setUserId(userId.value);

    const allTodoItems = await todoService.getAllTodoItems();

    return new Response(JSON.stringify(allTodoItems), {
        status: 200,
    });
}

/* ---------------------------------------- /
 * ######################################## /
 *         POST /api/firestore/todo         /
 * ######################################## /
 * ---------------------------------------- /
*/
export async function POST(request: Request) {
    logger.endpointHit('[/api/firestore/todo]', 'POST')

    // Check if the request has a body
    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const todoService = new TodoService();
    todoService.setUserId(userId.value);

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        const addTodoItem = await todoService.addTodoItem(requestBody as Todo.TodoItem);

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

/* --------------------------------------- /
 * ####################################### /
 *         PUT /api/firestore/todo         /
 * ####################################### /
 * --------------------------------------- /
*/
export async function PUT(request: Request) {
    logger.endpointHit('[/api/firestore/todo]', 'PUT')


    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const todoService = new TodoService();
    todoService.setUserId(userId.value);

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        await todoService.updateTodoItem(requestBody.id, requestBody.editedItem);

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

/* ---------------------------------------- /
 * ######################################## /
 *        PATCH /api/firestore/todo         /
 * ######################################## /
 * ---------------------------------------- /
*/
export async function PATCH(request: Request) {
    logger.endpointHit('[/api/firestore/todo]', 'PATCH')

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const todoService = new TodoService();
    todoService.setUserId(userId.value);

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        console.log(requestBody);

        await todoService.archiveTodoItem(requestBody.id);
        /*DEBUG*/ console.log("[/api/firestore] Updated Item ID: ", requestBody.id)

        return new Response(JSON.stringify({ message: 'Item archived successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error parsing JSON body', error);
        return new Response(JSON.stringify({ message: 'Error parsing JSON body' }), {
            status: 400,
        });
    }
}


/* ----------------------------------------- /
 * ######################################### /
 *        DELETE /api/firestore/todo         /
 * ######################################### /
 * ----------------------------------------- /
*/
export async function DELETE(request: Request) {
    logger.endpointHit('[/api/firestore/todo]', 'DELETE')

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const todoService = new TodoService();
    todoService.setUserId(userId.value);

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        console.log(requestBody);

        await todoService.deleteTodoItem(requestBody.id);
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
