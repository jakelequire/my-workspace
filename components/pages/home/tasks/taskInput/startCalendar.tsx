'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useTaskContext } from '../TaskContext';

export default function StartDateCalendar(): JSX.Element {
    const { todoItem, setTodoItem } = useTaskContext();

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[100%] pl-3 text-left font-normal',
                        !todoItem.started && 'text-muted-foreground'
                    )}>
                    {todoItem.started ? format(todoItem.started, 'PP') : <span>Start Date</span>}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={todoItem.started as unknown as Date}
                    onSelect={(date) => {
                        if (!date) {
                            console.log('NO DATE');
                            return;
                        }
                        setTodoItem({ ...todoItem, started: format(date, 'PP') });
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
