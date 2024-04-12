import { NotificationApi } from './../../types/server/notificationsApi';
import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { Todo } from '@/types/types';

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

    


}
