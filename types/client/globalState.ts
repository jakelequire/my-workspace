


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
        commitData: CodespaceApp.CommitHistoryData[];
        commitHistory: CodespaceApp.CommitHistory[];
    }

}