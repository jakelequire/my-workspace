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
import { useTaskContext } from '../TaskContext';
import { Todo } from '@/types/types';

export default function Category() {
    const { todoItem, setTodoItem } = useTaskContext();

    const setCategory = (value: any) => {
        console.log('Hello from setCategory');
        setTodoItem({
            ...todoItem,
            category: value as Todo.Category,
        });
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.menu_title}>
                <label className={`${styles.priority_title}`}>Category</label>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`${styles.menu} w-32`} variant='outline'>
                        {todoItem.category}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={todoItem.category} onChange={setCategory}>
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
