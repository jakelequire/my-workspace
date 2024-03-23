'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useTaskContext } from '../../../TaskContext';
import { useCallback } from 'react';


export default function CalendarInput(): JSX.Element {
    const { editedItem, setEditedItem } = useTaskContext();


    const handleSelectDate = useCallback(
        (date: any) => {
            if (!date) return;
            setEditedItem({ ...editedItem, due: format(date, 'PP') });
        },
        [editedItem, setEditedItem]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-[160px] pl-3 text-left font-normal',
                            !editedItem.due && 'text-muted-foreground'
                        )}>
                        {editedItem.due ? format(editedItem.due, 'PP') : <span>Due Date</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={editedItem.due as unknown as Date}
                    onSelect={handleSelectDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
