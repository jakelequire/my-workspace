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

export default function Priority() {
    const { todoItem, setTodoItem } = useTaskContext();

    const setPriority = (value: any) => {
        setTodoItem({
            ...todoItem,
            priority: value as Todo.Priority,
        });
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.menu_title}>
                <label className={`${styles.menu_title}`}>Priority</label>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`${styles.menu} w-[100%]`} variant='outline'>
                        {todoItem.priority}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={todoItem.priority}>
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
