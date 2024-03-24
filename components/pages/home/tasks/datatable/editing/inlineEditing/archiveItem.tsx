"use client"
import { useTaskContext } from "../../../TaskContext";

type Props = {
    id: string;
    children: React.ReactNode;
}

export default function ArchiveItem({ id, children }: Props) {
    const { archiveTodoItem } = useTaskContext();

    const handleArchive = () => {
        archiveTodoItem(id);
    };

    return (
        <a onClick={handleArchive}>
            {children}
        </a>
    );
}
