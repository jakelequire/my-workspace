import { firestore, storage } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';

InitApp();

interface FileData {
    id: string;
    url: string;
    file: File;
}

export default class FinanceService {
    private db: firestore.Firestore;
    private storage: storage.Storage;
    private userId: string;

    constructor() {
        this.db = firestore(); // Initialize Firestore using the Firebase app
        this.storage = storage(); // Initialize Storage using the Firebase app
        this.userId = '';
    }

    // Set the user id
    setUserId(userId: string) {
        this.userId = userId;
    }
    

    public async getSubscriptionItems(): Promise<any> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <getSubscriptionItems>");

        const snapshot = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('finances')
            .doc('subscriptions')
            .collection('items')
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    public async addSubscriptionItem(subscriptionItem: any): Promise<any> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <addSubscriptionItem>");

        const docRef = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('finances')
            .doc('subscriptions')
            .collection('items')
            .add(subscriptionItem);

        return { 
            id: docRef.id, 
            ...subscriptionItem
        };
    }


    public async pfpUpload({ ...props }: FileData): Promise<any> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <pfpUpload>");
        const { file } = props;
        console.log("{DEBUG} [pfpUpload] file: ", file)

        const fileBuf = await file.arrayBuffer();

        const fileBuffer = Buffer.from(fileBuf);

        // Upload the file to the storage
        const storageRef = this.storage.bucket('gs://my-workspace-8b9e9.appspot.com');
        console.log("{DEBUG} [pfpUpload] storageRef: ", storageRef)

        const fileRef = storageRef.file(`users/${this.userId}/assets/subscriptions/test.jpg`);
        //console.log("{DEBUG} [pfpUpload] fileRef: ", fileRef)

        await fileRef.save(fileBuffer).then(() => {
            console.log(`[financeService] {pfpUpload} File uploaded successfully: ${file.name}`);
        }).catch((error) => {
            console.error(`[financeService] {pfpUpload} Error uploading file: ${error}`);
        })

        // Get the download URL
        const downloadUrl = await fileRef.getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        console.log("[financeService] {pfpUpload} Download URL: ", downloadUrl);

        return downloadUrl;
    }



}
