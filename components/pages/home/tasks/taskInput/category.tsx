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

type Category = 'personal' | 'appointment' | 'project' | 'work' | 'other';

export default function Category() {
    const { category, setCategory } = useTaskContext();

    return (
        <div className={styles.menu_container}>
        <div className={styles.menu_title}>
            <label className={`${styles.priority_title}`}>Category</label>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`${styles.menu} w-32`} variant='outline'>{category}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Set Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={category as Category} onValueChange={setCategory as () => Category}>
                    <DropdownMenuRadioItem value='Personal'>Personal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Appointment'>Appointment</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Project'>Project</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Work'>Work</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Other'>Other</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
}
