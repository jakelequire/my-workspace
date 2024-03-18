import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { JT } from '@/types/types';

InitApp();

export class JobTracker {
    private db: firestore.Firestore;
    private userId: string;

    constructor() {
        this.db = firestore();
        this.userId = '';
    }

    initUser(userId: string): void {
        if(!userId) {
            throw new Error('User not found');
        }

        this.userId = userId;
    }

    async addJobItem(jobItem: JT.DbJobItem): Promise<JT.AddJobServerResponse> {
        console.warn("[JobTracker] {!API ENDPOINT CALLED!} addJobItem");

        const docRef = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .add(jobItem);
        return { id: docRef.id, ...jobItem } as JT.JobItem;
    }

    async getJobItem(id: string): Promise<JT.JobItem | undefined> {
        console.warn("[JobTracker] {!API ENDPOINT CALLED!} getJobItem");

        const doc = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .doc(id)
            .get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() } as JT.JobItem;
        } else {
            return undefined;
        }
    }

    async getAllJobItems(): Promise<JT.JobItem[]> {
        console.warn("[JobTracker] {!API ENDPOINT CALLED!} getAllJobItems");
        
        const snapshot = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .get();
        const items: JT.JobItem[] = [];
        snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data().jobItem } as JT.JobItem);
        });
        return items;
    }
    
    async deleteJobItem(id: string): Promise<void> {
        console.warn("[JobTracker] {!API ENDPOINT CALLED!} deleteJobItem");
        console.log("userId: ", this.userId);
        console.log("id: ", id);

        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .doc(id)
            .delete();
    }

}
