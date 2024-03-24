import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotesApp } from '@/types/types';


const NotepadContext = createContext<NotesApp.NotepadContextType | undefined>(undefined);

function useNotepadProvider() {
    const [notes, setNotes] = useState<NotesApp.Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<NotesApp.Note | null>(null);
    const [tabs, setTabs] = useState<NotesApp.Note[]>([]);

    const saveNote = (note: NotesApp.Note) => {
        // Take data from `selectedNote` and update the `notes` array
        if(selectedNote) {
            setNotes((prev) => { 
                return prev.map((n) => {
                    if(n.id === selectedNote.id) {
                        return {
                            ...n,
                            title: note.title,
                            content: note.content,
                            lastModified: note.lastModified
                        }
                    }
                    return n;
                });
            });
        };
    }

    const currentNoteHandler = () => {
        return notes.find((note) => note.id === selectedNote?.id);
    }

    const addNote = (note: NotesApp.Note) => {
        // Todo
    }

    const editNote = (note: NotesApp.Note) => {
        // Todo
    }
    
    const deleteNote = (note: NotesApp.Note) => {
        // Todo
    }

    return {
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        tabs,
        setTabs,
        saveNote,
        addNote,
        editNote,
        deleteNote,
        currentNoteHandler
    }
}

export const NotepadProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useNotepadProvider();
    return <NotepadContext.Provider value={value}>{children}</NotepadContext.Provider>;
}

export const useNotepadContext = () => {
    const context = useContext(NotepadContext);
    if (context === undefined) {
        throw new Error('useNotepadContext must be used within a NotepadProvider');
    }
    return context;
};
