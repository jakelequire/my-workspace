import { getFirestore, doc, collection, getDoc } from "firebase/firestore";

/*
Current Data structure:
    userData: { ... }
    users: { ... }

*/

export default class dbSync {
    private db: any;
    private docData: any;
    private data: any;
    private userDataCollection: any;
    private usersCollection: any;

    constructor(userId: string) {
        this.db = getFirestore();
        this.userDataCollection = doc(collection(this.db, 'userData'), userId);
        this.usersCollection = doc(collection(this.db, 'users'), userId);
    }


    public async syncDb(): Promise<void> {
        const userData = await getDoc(this.userDataCollection);
        const users = await getDoc(this.usersCollection);
        if (userData.exists() && users.exists()) {
            this.docData = userData.data();
            this.data = users.data();
            this.sync();
        } else {
            throw new Error('Unable to sync db');
        }
    }

    private sync(): void {
        const userData = this.docData;
        const users = this.data;
        const userDataKeys = Object.keys(userData);
        const usersKeys = Object.keys(users);
        const userDataKeysLength = userDataKeys.length;
        const usersKeysLength = usersKeys.length;
        if (userDataKeysLength === usersKeysLength) {
            for (let i = 0; i < userDataKeysLength; i++) {
                const userDataKey = userDataKeys[i];
                const usersKey = usersKeys[i];
                if (userDataKey === usersKey) {
                    const userDataValue = userData[userDataKey];
                    const usersValue = users[usersKey];
                    if (userDataValue !== usersValue) {
                        this.updateDb(userDataKey, userDataValue);
                    }
                }
            }
        } else {
            throw new Error('Unable to sync db');
        }
    }

    private updateDb(key: string, value: any): void {
        this.db.collection('users').doc(key).set(value);
    }

}