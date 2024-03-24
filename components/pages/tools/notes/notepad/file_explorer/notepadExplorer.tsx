'use client';
import { useNotepadContext } from "../../NotepadContext";
import NoteMetaData from "./noteMetaData";
import NoteExplorer from "./noteExplorer";
import NewNote from "./newNote";

export default function NotepadExplorer(): JSX.Element {

    
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-row w-full h-[20%] px-4 py-6 border-b">
                {/* Notepad Title & Save functionality */}
                <NoteMetaData />
            </div>
            <div className="flex flex-row w-full h-[10%]">
                {/* Add new note */}
                <NewNote />
            </div>
            <div className="flex flex-row w-full h-[70%]">
                {/* Notepad File Explorer */}
                <NoteExplorer />
            </div>
        </div>
    )
}
