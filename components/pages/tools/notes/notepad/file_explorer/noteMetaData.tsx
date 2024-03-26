'use client';
import { useNotepadContext } from "../../NotepadContext";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
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
        <div className='flex flex-col h-full w-full gap-2'>
            <Label className='text-sm font-semibold pl-1'>Title</Label>
            <Input
                className='w-full '
                placeholder='Select a note to edit...'
                value={selectedNote?.title}
                onChange={handleChange}
            />
            <span className='text-xs text-gray-400 pl-1 mb-4'>Last saved: {selectedNote?.lastModified}</span>
            <Button
                className='w-[50%] self-center'
                onClick={handleSave}
            > Save </Button>
        </div>
    )
}
