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
import { Todo } from '@/types/types';

InitApp();

export class Firestore {
    private db: firestore.Firestore;

    constructor() {
        this.db = firestore(); // Initialize Firestore using the Firebase app
    }

    // Add a new todo item
    async addTodoItem(todoItem: Todo.DbTodoItem): Promise<Todo.AddTodoServerResponse> {
        const docRef = await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .add(todoItem);
        /*DEBUG*/ // console.log("Document Reference: \n", docRef)
        /*DEBUG*/ // console.log("Document ID: \n", docRef.id)
        // export type AddTodoServerResponse = Promise<TodoItem>
        return { id: docRef.id, ...todoItem } as Todo.TodoItem;
    }

    // Update an existing todo item
    async updateTodoItem(id: string, todoItem: Partial<Todo.TodoItem>): Promise<void> {
        await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .update(todoItem);
    }

    // Fetch a single todo item by id
    async getTodoItem(id: string): Promise<Todo.TodoItem | undefined> {
        const doc = await this.db
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() } as Todo.TodoItem;
        } else {
            return undefined;
        }
    }

    // Fetch all todo items
    async getAllTodoItems(): Promise<Todo.TodoItem[]> {
        const snapshot = await this.db.collection('todo').doc('todoitem').collection('items').get();
        const returnedSnapshop = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo.TodoItem));
        /*DEBUG*/ console.log("[firestore] Returned Snapshot: \n", returnedSnapshop)
        return returnedSnapshop;
    }

    // Delete a todo item
    async deleteTodoItem(id: string): Promise<void> {
        await this.db.collection('todo').doc('todoitem').collection('items').doc(id).delete();
    }
}

// Usage:
// const firestoreService = new Firestore();
// firestoreService.addTodoItem({ title: "Learn Firestore", description: "Understand how Firestore works", completed: false, status: 'not started', started: '2021-01-01', due: '2021-01-10' });
