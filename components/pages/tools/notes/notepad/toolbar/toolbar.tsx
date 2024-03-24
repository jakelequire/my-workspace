import { useNotepadContext } from "../../NotepadContext"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export default function Toolbar(): JSX.Element {
    const { selectedNote, notes, saveNote } = useNotepadContext()

    const handleSaveNote = () => {
        console.log("[Toolbar.tsx] handleSaveNote: ", notes)
        if(!selectedNote) return
        saveNote(selectedNote)
    }

    return (
        <div className='flex h-full w-full'>
            <div className='flex items-center justify-between w-full h-full px-4 py-4 '>
                <SaveNote onClick={handleSaveNote} />
            </div>
        </div>
    )
}

function SaveNote({ onClick }: { onClick: () => void }) {
    return (
        <Button variant='ghost' onClick={onClick} className='flex items-center gap-2'>
            <CheckIcon />
        </Button>
    )
}
