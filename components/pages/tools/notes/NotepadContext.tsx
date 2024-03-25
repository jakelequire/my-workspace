import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotesApp } from '@/types/types';


const NotepadContext = createContext<NotesApp.NotepadContextType | undefined>(undefined);

function useNotepadProvider() {
    const [notes, setNotes] = useState<NotesApp.Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<NotesApp.Note | null>(null);
    const [tabs, setTabs] = useState<NotesApp.Note[]>([]);

    const saveNote = async (note: NotesApp.Note) => {
        const dbNote = {
            id: note.id,
            title: note.title,
            content: note.content,
            created: note.created,
            lastModified: new Date().toLocaleString(),
        }
        const response = await fetch('/api/firestore/notes', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbNote),
        })
        if (!response.ok) {
            console.error("[saveNote] Error saving note", response);
            return;
        }
        console.log("[saveNote] response", response);

        const updatedNotes = notes.map((n) => {
            if (n.id === note.id) {
                return {
                    ...n,
                    title: note.title,
                    content: note.content,
                    lastModified: new Date().toLocaleString(),
                }
            }
            return n;
        });

        setNotes(updatedNotes);
    }

    const createNewNote = async () => {
        const response = await fetch('/api/firestore/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'New Note',
                content: '',
                created: new Date().toLocaleString(),
                lastModified: new Date().toLocaleString(),
            }),
        })
        const data = await response.json();
        console.log("[createNewNote] data", data);

        setNotes((prev) => [...prev, data]);
    }

    /** @private */
    const fetchNotes = async () => {
        const response = await fetch('/api/firestore/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("[fetchNotes] data", data);

        setNotes(data);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const currentNoteHandler = () => {
        return notes.find((note) => note.id === selectedNote?.id);
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
        editNote,
        deleteNote,
        currentNoteHandler,
        createNewNote,
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
