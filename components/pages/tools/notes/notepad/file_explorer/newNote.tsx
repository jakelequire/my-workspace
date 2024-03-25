'use client';
import { useNotepadContext } from "../../NotepadContext";
import { NotesApp } from "@/types/types";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function NewNote(): JSX.Element {
    const { createNewNote } = useNotepadContext();

    const handleNewNote = () => {
        createNewNote();
    }

    return (
        <Button variant='outline' className='text-sm w-full border-t-0 border-x-0 border-b rounded-none' onClick={handleNewNote}>
            New Note
        </Button>
    )
}
