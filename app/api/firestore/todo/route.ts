import { NextResponse } from 'next/server';
import { Todo } from '@/types/types';
import { TodoService } from '@/server/firestore/todoService';
import { cookies } from 'next/headers';

/* ----------------------------------- /
 * ################################### /
 *         GET /api/firestore          /
 * ################################### /
 * ----------------------------------- /
*/
export async function GET(request: Request) {
    console.log('\n[/api/firestore/todo] GET Hit!');

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

/* ----------------------------------- /
 * ################################### /
 *         POST /api/firestore         /
 * ################################### /
 * ----------------------------------- /
*/
export async function POST(request: Request) {
    console.log('\n[/api/firestore/todo] POST Hit!');

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

/* ----------------------------------- /
 * ################################### /
 *         PUT /api/firestore          /
 * ################################### /
 * ----------------------------------- /
*/
export async function PUT(request: Request) {
    console.log('\n[/api/firestore/todo] PUT Hit!');

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

/* ---------------------------------- /
 * ################################## /
 *        PATCH /api/firestore        /
 * ################################## /
 * ---------------------------------- /
*/
export async function PATCH(request: Request) {
    console.log('\n[/api/firestore/todo] PATCH Hit!');

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


/* ----------------------------------- /
 * ################################### /
 *        DELETE /api/firestore        /
 * ################################### /
 * ----------------------------------- /
*/
export async function DELETE(request: Request) {
    console.log('\n[/api/firestore/todo] DELETE Hit!');

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
