


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