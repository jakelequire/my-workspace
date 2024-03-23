'use client';
import * as React from 'react';

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

export default function EditPriority() {
    const { editedItem, setEditedItem } = useTaskContext();

    const setPriority = (value: any) => {
        setEditedItem({
            ...editedItem,
            priority: value as Todo.Priority,
        });
    };

    return (
        <div className="flex flex-col h-full w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-full`} variant='outline'>
                        {editedItem.priority}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={editedItem.priority}>
                        <DropdownMenuRadioItem
                            value='Low'
                            onSelect={(_) => {
                                setPriority('Low');
                            }}>
                            Low
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Medium'
                            onSelect={(_) => {
                                setPriority('Medium');
                            }}>
                            Medium
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='High'
                            onSelect={(_) => {
                                setPriority('High');
                            }}>
                            High
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Urgent'
                            onSelect={(_) => {
                                setPriority('Urgent');
                            }}>
                            Urgent
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
