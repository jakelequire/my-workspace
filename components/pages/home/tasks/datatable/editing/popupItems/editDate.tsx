'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useTaskContext } from '../../../TaskContext';

export default function EditDate(): JSX.Element {
    const { editedItem, setEditedItem } = useTaskContext();


    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[100%] pl-3 text-left font-normal',
                        !editedItem.due && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {editedItem.due ? format(editedItem.due, 'PP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar 
                    mode='single' 
                    selected={editedItem.due as unknown as Date}
                    onSelect={(date) => {
                        if(!date) {
                            console.log("NO DATE")
                            return
                        };
                        setEditedItem({ ...editedItem, due: date as unknown as string });
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
