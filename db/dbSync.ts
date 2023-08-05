import { getFirestore, doc, collection, getDoc } from "firebase/firestore";


export default class dbSync {
    private uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }

    public async currentUser() {
        const db = getFirestore();
        const userRef = doc(collection(db, `userData/${this.uid}`), this.uid);
        const docData = await getDoc(userRef);
        if (docData.exists()) {
            const data = docData.data();
            if (data && data.session && data.session[0].todo) {
                return data.session[0].todo;
            }
        }
        return;
    }
}