'use client';
import { Textarea } from '@/components/ui/textarea';
import { useNotepadContext } from '../../NotepadContext';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function Notepad(): JSX.Element {
    const { selectedNote, setSelectedNote } = useNotepadContext();

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!selectedNote) return;
        setSelectedNote?.({ ...selectedNote, content: e.target.value });
    };

    return (
        <div className='flex h-full w-full'>
            <ScrollArea className='flex h-full w-full rounded-md border border-none rounded-br-lg rounded-bl-lg rounded-tr-none rounded-tl-none'>
                {selectedNote ? (
                    <Textarea
                        className='resize-none border-none rounded-br-lg rounded-bl-lg rounded-tr-none rounded-tl-none'
                        value={selectedNote?.content}
                        onChange={handleOnChange}
                    />
                ) : (
                    <div className='flex items-center justify-center h-full w-full'>
                        <p className='text-gray-400'>Select a note to edit</p>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
