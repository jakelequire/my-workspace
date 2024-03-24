'use client';
import { useNotepadContext } from "../../NotepadContext";
import { NotesApp } from "@/types/types";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function NewNote(): JSX.Element {
    const { notes, setNotes } = useNotepadContext();


    const handleNewNote = () => {
        const currentDate = format(new Date(), 'PP');

        const newNote: NotesApp.Note = {
            id: 'note-' + notes.length + 1,
            title: 'Untitled Note',
            content: '',
            active: false,
            created: currentDate,
            lastModified: currentDate
        }

        //@ts-ignore
        setNotes((prev) => [...prev, newNote]);
    }

    return (
        <Button variant='outline' className='text-sm w-full border-t-0 border-x-0 border-b rounded-none' onClick={handleNewNote}>
            New Note
        </Button>
    )
}
