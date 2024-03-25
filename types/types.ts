
/* ------------------------------------------ */
/* ######### Global Application Types ######### */
/* ------------------------------------------ */
export namespace GlobalState {
    interface LocalUser {
        id: string;
    }

    export interface GlobalContextType {
        user: LocalUser;
        setUser: (user: LocalUser) => void;
        todoList: Todo.TodoItem[];
        setTodoList: (todoList: Todo.TodoItem[]) => void;
        jobList: JobsApp.JobItem[];
        setJobList: (jobList: JobsApp.JobItem[]) => void;
        submissionCount: number;
        increaseSubmissionCount: () => void;
    }

}


/* ------------------------------------------ */
/* ######### Todo Application Types ######### */
/* ------------------------------------------ */
export namespace Todo {
    export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
    export type Category = 'Personal' | 'Appointment' | 'Project' | 'Work' | 'Other';
    export type Status = 'not started' | 'in-progress' | 'completed';

    export type TodoItem = {
        id: string;
        title: string;
        priority: Priority;
        category: Category;
        description: string;
        completed: boolean;
        status: Status;
        started: string;
        due: string;
    };

    export interface TaskContextType {
        todoItem: TodoItem;
        todoItems: TodoItem[];
        setTodoItem: (todoItem: TodoItem) => void;
        addTodoItem: (newItem: DbTodoItem) => void;
        editedItem: TodoItem;
        setEditedItem: (editedItem: TodoItem) => void;
        clearFields: () => void;
        deleteTodoItem: (id: string) => void;
        editTodoItem: (id: string, updatedItem: TodoItem) => Promise<Omit<Todo.TodoItem, 'id'> | undefined>
        archiveTodoItem: (id: string) => Promise<void>
    }

    export type DbTodoItem = Omit<TodoItem, 'id'>;
    
    export type AddTodoServerResponse = Promise<TodoItem>
}


/* ------------------------------------------ */
/* ######### Jobs Application Types ######### */
/* ------------------------------------------ */
export namespace JobsApp {
    export type Status = 'Applied' | 'Saved' | 'Pending Interview' | 'Interviewed' | 'Waiting for Response' | 'Archived';
    export type ApplicationType = 'Job' | 'Internship' | 'Freelance' | 'Contract' | 'Other';
    export type Source = 'Indeed' | 'LinkedIn' | 'Glassdoor' | 'Monster' | 'Company Website' | 'Other';

    export type JobItem = {
        id: string,
        companyName: string,
        position: string,
        payRange: string,
        location: string,
        dateApplied: string,
        source: string,
        status: Status,
        applicationType: ApplicationType,
        jobLink: string,
    }
    
    export interface JobTrackerContext {
        jobItem: JobItem[];
        setJobItem: (jobItems: JobItem[]) => void;
        newJobItem: JobItem;
        setNewJobItem: (jobItem: JobItem) => void;

        addJobItem: (newJobItem: DbJobItem) => void;
        clearFields: () => void;
        deleteJobItem: (id: string) => void;
        editJobItem: (id: string, updatedItem: JobItem) => Promise<Omit<JobsApp.JobItem, 'id'> | undefined>;
        archiveJobItem: (id: string, updatedItem: JobItem) => Promise<Omit<JobsApp.JobItem, 'id'> | undefined>;
    }

    export type DbJobItem = Omit<JobItem, 'id'>;
    export type AddJobServerResponse = Promise<JobItem>
}


/* ------------------------------------------ */
/* ######### Notes Application Types ######### */
/* ------------------------------------------ */
export namespace NotesApp {
    export type Note = {
        id: string;
        title: string;
        content: string;
        created: string;
        lastModified: string;
        active: boolean;
    }

    export interface NotepadContextType {
        notes: Note[];
        setNotes: (notes: Note[]) => void;
        selectedNote: Note | null;
        setSelectedNote: (note: Note) => void;
        tabs: Note[];
        setTabs: (note: Note[]) => void;
        saveNote: (note: NotesApp.Note) => void;
        editNote: (note: Note) => void;
        deleteNote: (note: Note) => void;
        currentNoteHandler: () => Note | undefined;
        createNewNote: () => void;
    }

    export type DbNote = Omit<Note, 'id' | 'active'>;
}
