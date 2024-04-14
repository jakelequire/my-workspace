import { NotificationApi, Notification } from './../../types/server/notificationsApi';
import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';

InitApp();

export default class NotificationsService implements NotificationApi {
    private db: firestore.Firestore;
    private userId: string;
    
    constructor() {
        this.db = firestore(); // Initialize Firestore using the Firebase app
        this.userId = '';
    }

    // Set the user id
    public setUserId(userId: string) {
        this.userId = userId;
    }

    // Fetch notifications
    public async fetchNotifications(): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <fetchNotifications>");
        
        const notifications = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notifications')
            .get();

        const snapshot = notifications.docs.map(doc => doc.data());
        console.log(snapshot);

        // return snapshot;
    }

    
    // Add a new notification
    public async addNotification(notification: Notification): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <addNotification>");
        let notificationService = '';
        
        switch(notification.type) {
            case 'EMAIL':
                notificationService = 'email';
                break;
            case 'TODO':
                notificationService = 'todo';
                break;
            case 'CODE':
                notificationService = 'code';
                break;
            case 'REMINDER':
                notificationService = 'reminder';
                break;
            default:
                notificationService = 'email';
        }

        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notifications')
            .doc(notificationService)
            .set(notification);
    }

}
