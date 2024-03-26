'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useNotepadContext } from '../../NotepadContext';
import { NotesApp } from '@/types/types';
import { TrashIcon } from '@radix-ui/react-icons';

export default function NoteExplorer(): JSX.Element {
    const { notes, selectedNote, setSelectedNote, setTabs } = useNotepadContext();

    const handleNoteClick = (note: NotesApp.Note) => {
        setSelectedNote(note);
        //@ts-ignore
        setTabs((prev) => {
            //@ts-ignore
            if (!prev.find((tab) => tab.id === note.id)) {
                return [...prev, note];
            }
            return prev;
        });
    };

    return (
        <div className='flex flex-col w-full h-full'>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    selected={selectedNote?.id === note.id}
                    onClick={() => handleNoteClick(note)}
                />
            ))}
        </div>
    );
}

function NoteCard({
    note,
    selected,
    onClick,
}: {
    note: NotesApp.Note;
    selected: boolean;
    onClick: () => void;
}) {
    const id = note.id;

    return (
        <div
            className={`flex justify-between items-center w-full h-fit px-4 py-2 cursor-pointer border-y ${
                selected ? 'bg-zinc-800' : ''
            }`}
            onClick={onClick}>
            <p className='text-xs'>{note.title}</p>
            <a className='flex items-center gap-2'>
                <DeleteAlertDialog id={id}/>
            </a>
        </div>
    );
}

function DeleteAlertDialog({id}: {id: string}) {
    const { selectedNote, deleteNote } = useNotepadContext();

    const handleDelete = () => {
        if (!selectedNote) {
            throw new Error('No note selected');
        }
        deleteNote?.(selectedNote.id);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <a>
                    <TrashIcon />
                </a>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Deleting <span className='font-semibold italic text-white'>{selectedNote?.title}</span>{' '}
                        will permanently remove it from your notes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-900 text-white' onClick={handleDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
