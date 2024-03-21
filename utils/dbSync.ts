import { Todo, JobsApp } from '@/types/types';
import localForage from '@/localForageConfig';

interface Updates {
    todoItems: Todo.DbTodoItem[];
    jobItems: JobsApp.DbJobItem[];
}

export async function synchronizeDb() {
    if (!navigator.onLine) {
        console.log('[synchronizeDb] You are offline. Cannot synchronize database.');
        return;
    }

    console.log('[synchronizeDb] Synchronizing database with Firebase...');

    try {
        const currentTodoItems = (await localForage.getItem<Todo.DbTodoItem[]>('todoItems')) || [];
        const currentJobItems = (await localForage.getItem<JobsApp.DbJobItem[]>('jobItems')) || [];

        const updates = await fetchDatabase();
        const updatesJson: Updates = await updates.json();

        console.log('[synchronizeDb] Updates from Firebase:', updatesJson);

        const todoItems = updatesJson.todoItems.map((item: Todo.DbTodoItem) => ({ ...item }));
        const jobItems = updatesJson.jobItems.map((item: JobsApp.DbJobItem) => ({ ...item }));

        console.log('[synchronizeDb] Updates from Firebase Mapped:', todoItems, jobItems);

        if (hasDifferences(currentTodoItems, todoItems)) {
            /*DEBUG*/ console.log('[synchronizeDb] There are differences in todoItems. Updating localForage...');
            /*DEBUG*/ console.log('[synchronizeDb] TodoItems:', todoItems);
            await localForage.setItem('todoItems', jobItems);
        }

        if (hasDifferences(currentJobItems, todoItems)) {
            /*DEBUG*/ console.log('[synchronizeDb] There are differences in jobItems. Updating localForage...');
            /*DEBUG*/ console.log('[synchronizeDb] JobItems:', jobItems);
            await localForage.setItem('jobItems', jobItems);
        }

        console.log('[synchronizeDb] Updates from Firebase:', updatesJson);
        await localForage.setItem('lastSynced', new Date().toISOString());
    } catch (error) {
        console.error('Error fetching lastSynced from localForage:', error);
    }
}

async function fetchDatabase() {
    console.log('[synchronizeDb] Fetching database from Firebase...');
    return await fetch('/api/firestore/sync');
}

function hasDifferences(localItems: any[], firebaseItems: any[]): boolean {
    // Quick length check to see if arrays differ in size
    if (localItems.length !== firebaseItems.length) return true;

    // Create a map of IDs for quick lookup
    const localItemsMap = new Map(localItems.map((item) => [item.id, item]));

    // Iterate over firebaseItems to check for differences
    for (const item of firebaseItems) {
        const localItem = localItemsMap.get(item.id);

        // Check if the item exists in the localItems
        if (!localItem) {
            return true; // Item doesn't exist locally, hence there's a difference
        }

        // Assuming 'title' and 'status' are the fields you want to compare,
        // add or remove fields as needed based on your actual data structure
        const fieldsToCompare = ['title', 'status', 'due', 'priority']; // Example fields
        for (const field of fieldsToCompare) {
            if (item[field] !== localItem[field]) {
                return true; // Field values differ, hence there's a difference
            }
        }

        // Optionally, remove the item from the map to optimize further checks
        localItemsMap.delete(item.id);
    }

    // If there are any items left in localItemsMap, it means they weren't found in firebaseItems
    if (localItemsMap.size > 0) return true;

    // If none of the above conditions met, there are no differences
    return false;
}
