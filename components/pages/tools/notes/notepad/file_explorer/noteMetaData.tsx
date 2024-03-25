'use client';
import { useNotepadContext } from "../../NotepadContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NoteMetaData(): JSX.Element {
    const { selectedNote, setSelectedNote, saveNote } = useNotepadContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedNote) {
            throw new Error('No note selected')
        }
        setSelectedNote({ ...selectedNote, title: e.target.value })
    }

    const handleSave = () => {
        if (!selectedNote) {
            throw new Error('No note selected')
        }
        saveNote(selectedNote)
    }

    return (
        <div className='flex flex-col gap-6 h-full w-full'>
            <Input
                className='w-full'
                placeholder='Title'
                value={selectedNote?.title}
                onChange={handleChange}
            />
            <Button
                className='w-full'
                onClick={handleSave}
            > Save </Button>
        </div>
    )
}
