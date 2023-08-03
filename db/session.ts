// /db/session.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, DocumentData } from "firebase/firestore";

export default class Session {
    private db: any;
    private userRef: any;
    private docData: any;
    private data: any;

    constructor() {
        this.db = getFirestore();
    }

    async userAuth() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            return uid;
        }
        return null;
    }
    
}