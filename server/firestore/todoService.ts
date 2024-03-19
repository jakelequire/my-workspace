import { firestore } from 'firebase-admin';
import { InitApp } from '@/lib/firebase-admin-config';
import { Todo } from '@/types/types';

InitApp();

export class TodoService {
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

    // Add a new todo item
    async addTodoItem(todoItem: Todo.DbTodoItem): Promise<Todo.AddTodoServerResponse> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} addTodoItem");

        const docRef = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .add(todoItem);
        return { id: docRef.id, ...todoItem } as Todo.TodoItem;
    }

    // Update an existing todo item
    async updateTodoItem(id: string, todoItem: Partial<Todo.TodoItem>): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} updateTodoItem");

        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .update(todoItem);
    }

    // Fetch a single todo item by id
    async getTodoItem(id: string): Promise<Todo.TodoItem | undefined> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} getTodoItem");

        const doc = await this.db
            .collection('users')
            .doc(this.userId)
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
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} getAllTodoItems");

        const snapshot = await this.db
            .collection('users')
            .doc(this.userId)
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .get();
        const returnedSnapshop = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo.TodoItem));
        //console.log("[firestore] Returned Snapshot: \n", returnedSnapshop)
        return returnedSnapshop;
    }

    // Delete a todo item
    async deleteTodoItem(id: string): Promise<void> {
        console.warn("\n[firestore] {!API ENDPOINT CALLED!} deleteTodoItem");
        
        await this.db
            .collection('users')
            .doc(this.userId)
            .collection('todo')
            .doc('todoitem')
            .collection('items')
            .doc(id)
            .delete().then(() => {
                console.log("[deleteTodoItem] Document successfully deleted!");
            }).catch((error) => {
                console.error("[deleteTodoItem] Error removing document: ", error);
            });
    }
}