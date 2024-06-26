'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Form,
    FormControl,
    FormDescription,
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
import { useBudgetingContext } from '../../../BudgetingContext';

const FormSchema = z.object({
    dob: z.date({
        required_error: 'An error occurred. Please try again.',
    }),
});


export default function DatePicker(): JSX.Element {
    // const { setSubscriptions } = useBudgetingContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { reset } = form;

    return (
    <Form {...form}>
        <form className='space-y-8 w-[100%]'>
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
                                            'w-[100%] pl-3 text-left font-normal',
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
                                    onSelect={(date) => {
                                        field.onChange(date);
                                        if(!date) return;
                                        // setSubscriptions({ ...subscriptions, date: format(date, 'PP') });
                                    }}
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
