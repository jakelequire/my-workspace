import NotificationsService from "@/server/firestore/notificationsService";
import { cookies } from 'next/headers';
import { Notification } from "@/types/server/notificationsApi";



export async function GET(request: Request) {
    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    try {
        const notificationService = new NotificationsService();
        notificationService.setUserId(userId.value);

        notificationService.fetchNotifications();

        // ...

        return new Response('Hello worker!', {
            headers: { 'content-type': 'text/plain' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: `An error occurred:\n ${error}` }), {
            status: 500,
        });
    }
}


const exampleNotification: Notification = {
    id: '123',
    type: 'EMAIL',
    subCategory: 'NEW',
    title: 'New email',
    body: 'You have a new email',
    date: new Date().toISOString(),
    read: false,
}


export async function POST(request: Request) {
    // Check if the request has a body
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No body provided' }));
    }

    const userId = cookies().get('userId')
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No user ID in cookies.' }), {
            status: 400,
        });
    }

    try {
        const notificationService = new NotificationsService();
        notificationService.setUserId(userId.value);

        await notificationService.addNotification(exampleNotification);
        // ...

        return new Response('Hello worker!', {
            headers: { 'content-type': 'text/plain' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: `An error occurred:\n ${error}` }), {
            status: 500,
        });
    }
}

