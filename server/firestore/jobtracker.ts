import { getAuth } from 'firebase/auth';
import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { JT } from '@/types/types';

InitApp();

export class JobTracker {
    private db: firestore.Firestore;
    private userId: string;

    constructor() {
        this.db = firestore();
        this.userId = getAuth().currentUser?.uid || '';
    }


    async addJobItem(jobItem: JT.DbJobItem): Promise<JT.AddJobServerResponse> {
        const docRef = await this.db
            .collection('jobtracker')
            .doc(this.userId)
            .collection('jobs')
            .add(jobItem);
        return { id: docRef.id, ...jobItem } as JT.JobItem;
    }


    

}
