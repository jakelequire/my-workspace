'use client';
import { useNotepadContext } from "../../NotepadContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NoteMetaData(): JSX.Element {


    return (
        <div className='flex flex-col gap-6 h-full w-full'>
            <Input
                className='w-full'
                placeholder='Title'
            />
            <Button
                className='w-full'
                onClick={() => console.log('Save')}
            > Save </Button>
        </div>
    )
}
