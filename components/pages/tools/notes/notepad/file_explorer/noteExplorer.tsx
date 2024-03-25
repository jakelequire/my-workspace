'use client';
import { useNotepadContext } from '../../NotepadContext';
import { NotesApp } from '@/types/types';

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
    return (
        <div
            className={`flex items-center w-full h-fit px-4 py-2 cursor-pointer border-y ${
                selected ? 'bg-zinc-800' : ''
            }`}
            onClick={onClick}>
            <p className='text-xs'>{note.title}</p>
        </div>
    );
}
