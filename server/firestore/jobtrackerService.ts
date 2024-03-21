import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { JobsApp } from '@/types/types';

InitApp();

export class JobTrackerService {
    private db: firestore.Firestore;
    private userId: string;

    constructor() {
        this.db = firestore();
        this.userId = '';
    }

    setUserId(userId: string): void {
        if(!userId) {
            throw new Error('User not found');
        }

        this.userId = userId;
    }

    async addJobItem(jobItem: JobsApp.DbJobItem): Promise<JobsApp.AddJobServerResponse> {
        console.warn("\n[JobTracker] {!API ENDPOINT CALLED!} addJobItem");

        const docRef = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .add(jobItem);
        return { id: docRef.id, ...jobItem } as JobsApp.JobItem;
    }

    async getJobItem(id: string): Promise<JobsApp.JobItem | undefined> {
        console.warn("\n[JobTracker] {!API ENDPOINT CALLED!} getJobItem");

        const doc = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .doc(id)
            .get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() } as JobsApp.JobItem;
        } else {
            return undefined;
        }
    }

    async getAllJobItems(): Promise<JobsApp.JobItem[]> {
        console.warn("\n[JobTracker] {!API ENDPOINT CALLED!} getAllJobItems");
        
        const snapshot = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('jobs')
            .get();
        const items: JobsApp.JobItem[] = [];
        snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data().jobItem } as JobsApp.JobItem);
        });
        return items;
    }
    
    async deleteJobItem(id: string): Promise<void> {
        console.warn("\n[JobTracker] {!API ENDPOINT CALLED!} deleteJobItem");
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
