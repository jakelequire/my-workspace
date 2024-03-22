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

const FormSchema = z.object({
    dob: z.date({
        required_error: 'An error occurred. Please try again.',
    }),
});

export default function CalendarInput(): JSX.Element {
    const { editedItem, setEditedItem } = useTaskContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { reset } = form;

    const handleSelectDate = useCallback((date: any) => {
        form.setValue('dob', date);
        if (!date) return;
        setEditedItem({ ...editedItem, due: format(date, 'PP') });
    }, [form, editedItem, setEditedItem]);

    return (
    <Form {...form}>
        <form className='space-y-8'>
            <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-[160px] pl-3 text-left font-normal',
                                            !field.value && 'text-muted-foreground'
                                        )}>
                                        {field.value ? (
                                            format(field.value, 'PP')
                                        ) : (
                                            <span>Due Date</span>
                                        )}
                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                    mode='single'
                                    selected={field.value}
                                    onSelect={handleSelectDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </form>
    </Form>
    )
}
