import { useNotepadContext } from "../../NotepadContext"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export default function Toolbar(): JSX.Element {
    const { selectedNote, notes, saveNote } = useNotepadContext()


    return (
        <div className='flex h-full w-full'>

        </div>
    )
}


