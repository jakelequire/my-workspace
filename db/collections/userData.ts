// /db/collections/userData.ts
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";
import { UserDataCollection } from "../types/userData";

export default class UserData {
  private readonly db: any;
  readonly uid: string;
  readonly userRef: DocumentReference<DocumentData>;
  docData: DocumentData;

  constructor(uid: string) {
    this.db = getFirestore();
    this.uid = uid;
    this.userRef = doc(this.db, "userData", this.uid);
    this.docData = {};
  }

  /**
   * @returns this
   *
   * @description Initializes the class and sets the document data
   * if the document exists, otherwise creates a new document at /userData/{uid}
   * and sets the document data to the new document.
   *
   * @throws Error if db or userRef is not initialized
   * @throws Error if the document does not exist and cannot be created
   * @throws Error if the document exists but cannot be read
   */
  public async init(): Promise<this> {
    // Validate
    if (!this.uid) {
      return this;
    } else if (!this.db) {
      throw new Error("db not initialized");
    } else if (!this.userRef) {
      throw new Error("userRef not initialized");
    }
    // Get the document
    const docSnap = await getDoc(this.userRef);
    if (docSnap.exists()) {
      this.docData = docSnap.data();
    }
    // If the document doesn't exist, create it
    if (!this.docData.uid) {
      await this.newCollection();
    }
    return this;
  }

  /**
   * @returns DocumentSnapshot<DocumentData, DocumentData> | null
   *
   * @description Returns the document snapshot of /userData/{uid}
   */
  public async userSnapshot(): Promise<DocumentSnapshot<DocumentData> | null> {
    await this.init();
    const docSnap = await getDoc(this.userRef);
    return docSnap;
  }

  /**
   * @returns DocumentReference<DocumentData>
   *
   * @description Creates a new document at /userData/{uid}
   */
  public async newCollection(): Promise<DocumentReference<DocumentData>> {
    const docRef = doc(this.db, "userData", this.uid);
    await setDoc(docRef, { uid: this.uid });
    return docRef;
  }

  /**
   * @param list The list to add to the collection
   * @returns void | Error
   *
   * @description Adds a list to /userData/{uid}/lists
   */
  async createList(listId: string, list: UserDataCollection.List) {
    // Create a new document for the list within the 'lists' subcollection
    const listRef = doc(this.userRef, 'lists', listId);
    await setDoc(listRef, list);
    return listRef.id; // Return the ID of the new list
  }
  /**
   * @param listId The id of the list to add the task to
   * @param task The task to add to the list
   * @returns void | Error
   *
   * @description Adds a task to /userData/{uid}/lists/{listId}/items
   */

  async createTask(listId: string, taskId: string, task: UserDataCollection.Task) {
    // Create a new document for the task within the 'tasks' subcollection of the specified list
    const taskRef = doc(this.userRef, 'lists', listId, 'tasks', taskId);
    await setDoc(taskRef, task);
    return taskRef.id; // Return the ID of the new task
  }

}
