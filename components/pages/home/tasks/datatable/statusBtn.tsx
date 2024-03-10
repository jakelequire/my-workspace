'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTaskContext } from '../TaskContext';
import { Todo } from '@/types/types';

type Props = {
    id: Todo.TodoItem['id'];
    currentStatus: Todo.Status;
};

export default function EditStatusBtn({id, currentStatus}: Props) {
    const { todoItems, editTodoItem } = useTaskContext();

    const todoRef = todoItems.find((item: Todo.TodoItem) => item.id === id);

    const handleStatusChange = async (status: Todo.Status) => {
        if (!todoRef) return;
        const editedItem = editTodoItem(id, { ...todoRef, status: status });

        const response = await fetch('/api/firestore', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, editedItem }),
        });
        if (!response.ok) {
            console.error('Failed to update status');
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='w-fit'>{currentStatus}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Edit Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={status}>
                    <DropdownMenuRadioItem
                        value='not started'
                        onClick={() => {
                            handleStatusChange('not started');
                        }}>
                        not started
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value='in-progress'
                        onClick={() => {
                            handleStatusChange('in-progress');
                        }}>
                        in-progress
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value='completed'
                        onClick={() => {
                            handleStatusChange('completed');
                        }}>
                        completed
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
