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


export default function Priority() {
    const [priority, setPriority] = React.useState('Low');

    return (
        <div className={styles.menu_container}>
        <div className={styles.menu_title}>
            <label className={`${styles.menu_title}`}>Priority</label>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`${styles.menu} w-24`} variant='outline'>{priority}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
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
