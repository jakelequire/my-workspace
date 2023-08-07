// /db/collections/userData.ts
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, DocumentData, DocumentReference } from "firebase/firestore";
import { UserData as D } from "../types/userData";


export default class UserData {
    public readonly uid: string;
    public readonly userRef: DocumentReference<DocumentData>;
    private readonly db: any;
    public docData: DocumentData;

    constructor(uid: string) {
        this.db = getFirestore();
        this.uid = uid;
        this.userRef = doc(this.db, "userData", this.uid); 
        this.docData = {};
    }

    async init() {
        if(!this.uid) {
            return this;
        } else if(!this.db) {
            throw new Error("No db");
        } else if(!this.userRef) {
            throw new Error("No userRef");
        } else {
            console.log("all good");
        }
        const docSnap = await getDoc(this.userRef);
        if (docSnap.exists()) {
            this.docData = docSnap.data();
        }
        if(!this.docData.uid) {
            await this.newCollection();
        }
    }

    async newCollection() {
        const docRef = doc(collection(this.db, "userData", this.uid));
        await setDoc(docRef, { uid: this.uid });
        return docRef;
    }


    async newList(list: D.NewList) {
        await this.init();
        const listsCollection = collection(this.userRef, "lists");
        const newListRef = await addDoc(listsCollection, list); // If you want to auto-generate the ID
        return newListRef;
    }

    async newItem(itemTitle: string, item: DocumentData) {
        await this.init();
        const itemsCollection = collection(this.userRef, "items");
        const newItemRef = await addDoc(itemsCollection, item); // If you want to auto-generate the ID
        return newItemRef;
    }

}

export * from "./userData";