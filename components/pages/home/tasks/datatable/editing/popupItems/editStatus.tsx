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
import { useTaskContext } from '../../../TaskContext';
import { Todo } from '@/types/types';

type Props = {
    id: Todo.TodoItem['id'];
};

export default function EditStatusBtn({id }: Props) {
    const { todoItems, editedItem, setEditedItem } = useTaskContext();

    const todoRef = todoItems.find((item: Todo.TodoItem) => item.id === id);

    const handleStatusChange = async (status: Todo.Status) => {
        if (!todoRef) return;
        setEditedItem({ ...todoRef, status });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='w-[100%]'>{editedItem.status}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Edit Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={editedItem.status}>
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
