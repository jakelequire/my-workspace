
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
        commitData: CodespaceApp.CommitHistoryData;
        setCommitHistory: (data: CodespaceApp.CommitHistoryData) => void;
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
        requestCount: number;
        saveNote: (note: NotesApp.Note) => void;
        editNote: (note: Note) => void;
        deleteNote: (id: string) => void;
        currentNoteHandler: () => Note | undefined;
        createNewNote: () => void;
    }

    export type DbNote = Omit<Note, 'id' | 'active'>;
}


export namespace CodespaceApp {
    export interface CodeSpaceContextType {
        commitHistory: CodespaceApp.GitHubCommitHistoryResponse | undefined;
        setCommitHistory: (commitHistory: CodespaceApp.GitHubCommitHistoryResponse) => void;
        filteredCommitHistory: CodespaceApp.CommitHistoryData[];
        recentBuild: CodespaceApp.VercelDeploymentResponse[];
        setRecentBuild: (recentBuild: CodespaceApp.VercelDeploymentResponse[]) => void;
        refreshBuildStatus: () => void;
        contributionCount: CodespaceApp.ContributionCount;
    }

    export type DeploymentStates = "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED" | ""

    export interface VercelDeploymentResponse {
        name: string;
        url: string;
        created: string;
        state: DeploymentStates;
        inspectorUrl: string;
        meta : {
            githubCommitMessage: string;
            githubRepo: string;
            githubRepoVisibility: string;
        };
        target: string;
        created_at: string;
        building_at: string;
        ready_at: string;
    }

    export interface DeploymentData {
        url: string;
        id: number;
        node_id: string;
        state: string;
        environment: string;
        created_at: string;
        updated_at: string;
        statuses_url: string;
        target_url: string;
    }

    export interface CommitHistory {
        totalContributions: number;
        weeks: {
            contributionDays: {
                contributionCount: number;
                date: string;
            }[];
            firstDay: string;
        }[];
    }

    export interface GitHubCommitHistoryResponse {
        data: {
            user: {
                contributionsCollection: {
                    contributionCalendar: {
                        totalContributions: number;
                        weeks: Array<{
                            contributionDays: Array<{
                                color: string;
                                contributionCount: number;
                                date: string;
                                weekday: number;
                            }>;
                            firstDay: string;
                        }>;
                    };
                };
            };
        };
    }

    export interface CommitHistoryData {
        day: string;
        value: number;
    }

    export interface ContributionCount {
        total: number;
        year: {
            '2022': number;
            '2023': number;
            '2024': number;
        };
    }
}
