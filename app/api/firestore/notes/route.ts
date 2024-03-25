import { NotepadService } from '@/server/firestore/notepadService';
import { cookies } from 'next/headers';
import { NotesApp } from '@/types/types';



/* --------------------------------------- /
 * ####################################### /
 *        GET /api/firestore/notes         /
 * ####################################### /
 * --------------------------------------- /
*/
export async function GET(request: Request) {
    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const notepadService = new NotepadService();
    notepadService.setUserId(userId.value);

    const notes = await notepadService.getAllNotes();
    return new Response(JSON.stringify(notes), {
        headers: {
            'content-type': 'application/json',
        },
    });

}


/* --------------------------------------- /
 * ####################################### /
 *        POST /api/firestore/notes        /
 * ####################################### /
 * --------------------------------------- /
*/
export async function POST(request: Request) {
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), {
            status: 400,
        });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const notepadService = new NotepadService();
    notepadService.setUserId(userId.value);

    try {
        const requestBody = await request.json();
        const addNote = await notepadService.addNote(requestBody as NotesApp.Note);

        return new Response(JSON.stringify({ ...addNote }), {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error adding note.' }), {
            status: 500,
        });
    }
}

/* --------------------------------------- /
 * ####################################### /
 *         PUT /api/firestore/notes        /
 * ####################################### /
 * --------------------------------------- /
*/
export async function PUT(request: Request) {
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), {
            status: 400,
        });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const notepadService = new NotepadService();
    notepadService.setUserId(userId.value);

    try {
        const requestBody = await request.json();
        await notepadService.updateNote(requestBody.id, requestBody as NotesApp.Note);

        return new Response(JSON.stringify({ message: 'Note updated.' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error updating note.' }), {
            status: 500,
        });
    }
}

/* --------------------------------------- /
 * ####################################### /
 *       DELETE /api/firestore/notes       /
 * ####################################### /
 * --------------------------------------- /
*/
export async function DELETE(request: Request) {
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), {
            status: 400,
        });
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const notepadService = new NotepadService();
    notepadService.setUserId(userId.value);

    try {
        const requestBody = await request.json();
        await notepadService.deleteNote(requestBody.id);

        return new Response(JSON.stringify({ message: 'Note deleted.' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error deleting note.' }), {
            status: 500,
        });
    }
}


