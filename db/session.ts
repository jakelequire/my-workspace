// /db/session.ts
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, collection, doc, getDoc, DocumentData} from 'firebase/firestore';
import dbSync from './dbSync';

export default class Session {
	private db: any;
	private userRef: any;
	private docData: any;
	private data: any;

	constructor() {
		this.db = getFirestore();
	}

	async userAuth(): Promise<string | null> {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const uid = user.uid;
			return uid;
		} else {
			throw new Error('User not logged in');
		}
	}

	// async syncDb(): Promise<dbSync | Error> {
	// 	const uid = await this.userAuth();
	// 	if (uid) {
	// 		const dbSyncObj = new dbSync(uid);
    //         await dbSyncObj.syncDb();
	// 		return dbSyncObj;
	// 	} else {
	// 		throw new Error('Unable to sync db');
	// 	}
	// }

    

}
