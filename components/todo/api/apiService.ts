import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";


export async function getUserData(userId: string) {
    const db = getFirestore();
    const userRef = doc(collection(db, "users"), userId);
    const docData = await getDoc(userRef);
    if (docData.exists()) {
        const data = docData.data();
        return data ? data : null;
    }
    return null;
}
