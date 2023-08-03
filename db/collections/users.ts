import { getFirestore, collection, doc, getDoc, DocumentData } from "firebase/firestore";

export async function getUserData(userId: string): Promise<DocumentData | null> {
    const db = getFirestore();
    const userRef = doc(collection(db, "users"), userId);
    const docData = await getDoc(userRef);
    if (docData.exists()) {
        const data = docData.data();
        return data ? data : null;
    }
    if (!docData.exists()) {
        console.log("getUserData | <!doc.data.exists()>", "no data")
    }
    return null;
}