'use client';
import * as React from 'react';
import styles from './menu.module.css';

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

export default function EditCategory() {
    const { editedItem, setEditedItem } = useTaskContext();

    const setCategory = (value: any) => {
        console.log('Hello from setCategory');
        setEditedItem({
            ...editedItem,
            category: value as Todo.Category,
        });
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className='text-sm mb-2'>
                <label className={``}>Category</label>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-full`} variant='outline'>
                        {editedItem.category}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={editedItem.category} onChange={setCategory}>
                        <DropdownMenuRadioItem
                            onSelect={(e) => {
                                setCategory('Personal');
                            }}
                            value='Personal'>
                            Personal
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Appointment'
                            onSelect={(_) => {
                                setCategory('Appointment');
                            }}>
                            Appointment
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Project'
                            onSelect={(_) => {
                                setCategory('Project');
                            }}>
                            Project
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Work'
                            onSelect={(_) => {
                                setCategory('Work');
                            }}>
                            Work
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Other'
                            onSelect={(_) => {
                                setCategory('Other');
                            }}>
                            Other
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
