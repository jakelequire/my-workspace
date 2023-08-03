// /db/collections/userData.ts
import { getFirestore, collection, doc, getDoc, DocumentData } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { UserData as D } from "../types/userData";

export default class UserData {
    private db: any;
    private userRef: any;
    private docData: any;
    private data: any;

    constructor(userId: string) {
        this.db = getFirestore();
        this.userRef = doc(collection(this.db, "users"), userId);
    }

    /**
    * @returns {Promise<DocumentData | null>} Returns the user data or null if no data exists
    */
    async getUserData(): Promise<DocumentData | null> {
        this.docData = await getDoc(this.userRef);
        if (this.docData.exists()) {
            this.data = this.docData.data();
            return this.data ? this.data : null;
        }
        if (!this.docData.exists()) {
            console.log("getUserData | <!doc.data.exists()>", "no data")
        }
        return null;
    }

    /**
     * @returns {Promise<User | null>} Returns the user id or null if no user is logged in
    */
    async userAuth() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            return uid;
        }
        return null;
    }

    /**
     * @param {string} listTitle The title of the list to be returned
     * @returns {Promise<D.List | null>} Returns the list or null if no list exists
     * @example
     * 
     * const list = await getUserList("My List");
     * console.log(list);
     */
    async updateUserData(data: any) {
        await this.getUserData();
        if (this.data) {
            await this.userRef.update(data);
            return;
        }
        if (!this.data) {
            await this.userRef.set(data);
            return;
        }
    }

    /**
     * @param {D.List} listTitle The title of the list to be returned
     * @returns {Promise<D.List | null>} Returns the list or null if no list exists
     * @example
     * 
     * const list = await getUserList("My List");
     * console.log(list);
    */
    async updateList(list: D.List) {
        await this.getUserData();
        if (this.data) {
            await this.userRef.update({
                [`list.${list.id}`]: list
            });
            return;
        }
        if (!this.data) {
            await this.userRef.set({
                [`list.${list.id}`]: list
            });
            return;
        }
    }

    /**
     * @param {string} listTitle The title of the list to be returned
     * @returns {Promise<D.List | null>} Returns the list or null if no list exists
    */
    async deleteList(id: string) {
        await this.getUserData();
        if (this.data) {
            await this.userRef.update({
                [`list.${id}`]: null
            });
            return;
        }
        if (!this.data) {
            await this.userRef.set({
                [`list.${id}`]: null
            });
            return;
        }
    }

}

export * from "./userData";