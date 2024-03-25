import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { NotesApp } from '@/types/types';

InitApp();

export class NotepadService {
    private db: firestore.Firestore;
    private userId: string;
    
    constructor() {
        this.db = firestore(); // Initialize Firestore using the Firebase app
        this.userId = '';
    }

    // Set the user id
    setUserId(userId: string) {
        this.userId = userId;
    }


    public async addNote(note: NotesApp.DbNote): Promise<NotesApp.Note> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <addNote>");

        const docRef = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notes')
            .add(note);

        return { id: docRef.id, ...note } as NotesApp.Note;
    }


    public async updateNote(id: string, note: Partial<NotesApp.Note>): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <updateNote>");

        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notes')
            .doc(id)
            .update(note);
    }
    

    public async getNote(id: string): Promise<NotesApp.Note | undefined> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <getNote>");

        const doc = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notes')
            .doc(id)
            .get();

        return doc.data() as NotesApp.Note;
    }

    public async deleteNote(id: string): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <deleteNote>");

        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notes')
            .doc(id)
            .delete();
    }

    public async getAllNotes(): Promise<NotesApp.Note[]> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} <getAllNotes>");

        const snapshot = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('notes')
            .get();

        const notes: NotesApp.Note[] = [];
        snapshot.forEach(doc => {
            notes.push({ id: doc.id, ...doc.data() } as NotesApp.Note);
        });

        return notes;
    }
}
