import { DocumentData } from "firebase/firestore";
import { UserData as D } from "../types/userData";
export default class UserData {
    readonly uid: string;
    userRef: any;
    docData: any;
    constructor(uid: string);
    getAuthId(): Promise<string | null>;
    getUserData(): Promise<DocumentData | null>;
    updateUserData(data: any): Promise<void>;
    deleteItem(listId: string, itemId: string): Promise<void>;
    deleteList(listId: string): Promise<void>;
    updateList(list: D.List): Promise<void>;
    updateItem(listId: string, item: D.Item): Promise<void>;
}
export * from "./userData";