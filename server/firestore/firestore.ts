// Top Level Collection: todo
// Document: todoitem
// Collection: items
// Document: item
// Field: id
// Field: title
// Field: description
// Field: completed
// Field: status
// Field: started
// Field: due

import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';

type TodoItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    status: 'not started' | 'in-progress' | 'completed';
    started: string;
    due: string;
};

InitApp();

export class Firestore {
    private db: firestore.Firestore;

    constructor() {
        this.db = firestore(); // Initialize Firestore using the Firebase app
    }

    // Add a new todo item
    async addTodoItem(todoItem: Omit<TodoItem, 'id'>): Promise<firestore.DocumentReference> {
        const docRef = await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .add(todoItem);
        return docRef;
    }

    // Update an existing todo item
    async updateTodoItem(id: string, todoItem: Partial<TodoItem>): Promise<void> {
        await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .update(todoItem);
    }

    // Fetch a single todo item by id
    async getTodoItem(id: string): Promise<TodoItem | undefined> {
        const doc = await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() } as TodoItem;
        } else {
            return undefined;
        }
    }

    // Fetch all todo items
    async getAllTodoItems(): Promise<TodoItem[]> {
        const snapshot = await this.db.collection('todo').doc('todoitem').collection('items').get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TodoItem));
    }

    // Delete a todo item
    async deleteTodoItem(id: string): Promise<void> {
        await this.db.collection('todo').doc('todoitem').collection('items').doc(id).delete();
    }
}

// Usage:
// const firestoreService = new Firestore();
// firestoreService.addTodoItem({ title: "Learn Firestore", description: "Understand how Firestore works", completed: false, status: 'not started', started: '2021-01-01', due: '2021-01-10' });
