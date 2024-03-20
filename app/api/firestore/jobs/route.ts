import { NextResponse } from 'next/server';
import { JobTrackerService } from '@/server/firestore/jobtrackerService';
import { cookies } from 'next/headers';
import { JT } from '@/types/types';

/* ----------------------------------- /
 * ################################### /
 *       GET /api/firestore/jobs       /
 * ################################### /
 * ----------------------------------- /
 */
export async function GET(request: Request) {
    console.log('\n[/api/firestore/jobs] Hello from GET');

    const getUserId = cookies().get('userId');

    if (getUserId) {
        const jobTracker = new JobTrackerService();
        jobTracker.setUserId(getUserId.value);
        const allJobItems = await jobTracker.getAllJobItems();
        const responseObject: JT.JobItem[] = [];
        for (const jobItem of allJobItems) {
            const resObject = {
                id: jobItem.id,
                companyName: jobItem.companyName,
                position: jobItem.position,
                payRange: jobItem.payRange,
                location: jobItem.location,
                dateApplied: jobItem.dateApplied,
                source: jobItem.source,
                status: jobItem.status,
                applicationType: jobItem.applicationType,
                jobLink: jobItem.jobLink,
            };

            responseObject.push(resObject);
        }
        return new Response(JSON.stringify(responseObject), {
            status: 200,
        });
    } else {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }
}

/* ----------------------------------- /
 * ################################### /
 *      POST /api/firestore/jobs       /
 * ################################### /
 * ----------------------------------- /
 */
export async function POST(request: Request) {
    console.log('\n[/api/firestore/jobs] Hello from POST');
    
    if (!request.body) {
        return NextResponse.json({ message: 'No body provided' });
    }

    const getUserId = cookies().get('userId');
    if (getUserId) {
        const requestBody = await request.json();
        try {
            const jobTrackerService = new JobTrackerService();
            jobTrackerService.setUserId(getUserId.value);
            const addTodoItem = await jobTrackerService.addJobItem(requestBody as JT.DbJobItem);
            return new Response(JSON.stringify(addTodoItem), {
                status: 200,
            });
        } catch (error) {
            console.error('Error adding job item:', error);
            return new Response(JSON.stringify({ message: 'Error adding job item' }), {
                status: 500,
            });
        }
    }
}


/* ---------------------------------------- /
 * ######################################## /
 *        DELETE /api/firestore/jobs        /
 * ######################################## /
 * ---------------------------------------- /
*/
export async function DELETE(request: Request) {
    console.log('\n[/api/firestore] Hello from DELETE');

    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }), { status: 400 });
    }

    const getUserId = cookies().get('userId');

    if (!getUserId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    const jobTracker = new JobTrackerService();

    try {
        // Directly await the JSON body parsing
        const requestBody = await request.json();
        jobTracker.setUserId(getUserId.value);
        await jobTracker.deleteJobItem(requestBody.id);
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
