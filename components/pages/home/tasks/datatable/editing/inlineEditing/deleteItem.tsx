"use client";
import { useTaskContext } from "../../../TaskContext";

type Props = {
    id: string;
    children: React.ReactNode;
}

export default function DeleteItem({ id, children }: Props) {
    const { deleteTodoItem } = useTaskContext();

    const handleDelete = () => {
        deleteTodoItem(id);
    };

    return (
        <a onClick={handleDelete}>
            {children}
        </a>
    );
}
