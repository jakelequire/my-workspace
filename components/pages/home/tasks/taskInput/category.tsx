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


export default function Category() {
    const [priority, setPriority] = React.useState('Low');

    return (
        <div className={styles.menu_container}>
        <div className={styles.menu_title}>
            <label className={`${styles.priority_title}`}>Category</label>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`${styles.menu} w-32`} variant='outline'>{priority}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Set Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
                    <DropdownMenuRadioItem value='Low'>Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Medium'>Medium</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='High'>High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='Urgent'>Urgent</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
}
