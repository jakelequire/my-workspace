import { TodoService } from '@/server/firestore/todoService';
import { JobTrackerService } from '@/server/firestore/jobtrackerService';
import { cookies } from 'next/headers';


export async function GET(request: Request) {
    console.log("\n[api/firestore/sync/route.ts] GET request received");

    const userId = cookies().get('userId');
    if(!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const todoService = new TodoService();
    const jobService = new JobTrackerService();

    todoService.setUserId(userId.value);
    jobService.setUserId(userId.value);

    const allTodoItems = await todoService.getAllTodoItems();
    const allJobItems = await jobService.getAllJobItems();

    return new Response(JSON.stringify({ todoItems: allTodoItems, jobItems: allJobItems }), {
        status: 200,
    });
}
