import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";


export async function getUserData(userId: string) {
    const db = getFirestore();
    const userRef = doc(collection(db, "users"), userId);
    console.log("getUserData | <useRef>", userRef)
    const docData = await getDoc(userRef);
    console.log("getUserData | <docData>", docData)
    if (docData.exists()) {
        console.log("getUserData | <docData.exists()>", docData.data(), typeof docData.data())
        const data = docData.data();
        return data ? data : null;
    }
    if (!docData.exists()) {
        console.log("getUserData | <!doc.data.exists()>", "no data")
    }
    return null;
}
