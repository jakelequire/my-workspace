import { getFirestore, doc, collection, getDoc, setDoc } from "firebase/firestore";
import { UserData } from "@/db/types/userData";

export default async function newList(uid: string, list: UserData.NewList) {
    const db = getFirestore();
    const userRef = doc(collection(db, `userData/${uid}/list`), uid);
    const docData = await getDoc(userRef);
    if (docData.exists()) {
        const data = docData.data();
        if (data && data.session && data.session[0].todo) {
            const lists = data.session[0].todo;
            lists.push(list);
            await setDoc(userRef, { lists: lists });
            return;
        }
    }
    if (!docData.exists()) {
        await setDoc(userRef, { lists: [list] });
        return;
    }
    return;
}