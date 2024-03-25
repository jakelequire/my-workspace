'use client';
import { useNotepadContext } from '../../NotepadContext';
import { NotesApp } from '@/types/types';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function NotepadTabs(): JSX.Element {
    const { tabs, setTabs, setSelectedNote, requestCount } = useNotepadContext();

    const handleTabClick = (note: NotesApp.Note) => {
        //@ts-ignore
        setTabs((prev) =>
            //@ts-ignore
            prev.map((tab) => {
                if (tab.id === note.id) {
                    return { ...tab, active: true };
                }
                return { ...tab, active: false };
            })
        );
        setSelectedNote?.(note);
    };

    const handleTabClose = (note: NotesApp.Note) => {
        //@ts-ignore
        setTabs((prev) => prev.filter((tab) => tab.id !== note.id));
    };

    return (
        <div className='border-b flex h-full w-full' key={requestCount}>
            {tabs.map((note) => (
                <Tab
                    key={note.id}
                    title={note.title}
                    active={note.active}
                    onClick={() => handleTabClick(note)}
                    onClose={() => handleTabClose(note)}
                />
            ))}
        </div>
    );
}

function Tab({
    title,
    active,
    onClick,
    onClose,
}: {
    title: string;
    active: boolean;
    onClick: () => void;
    onClose: () => void;
}) {
    const { requestCount } = useNotepadContext();
    return (
        <div
            className={`flex items-center justify-between gap-4 h-full pl-4 pr-2 min-w-32 border-x text-sm cursor-pointer
            ${active ? 'bg-zinc-800' : ''}
            `}
            onClick={onClick}>
            <p>{title}</p>
            <Cross2Icon onClick={onClose} />
        </div>
    );
}
