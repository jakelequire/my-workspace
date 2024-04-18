'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CustomCalendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3 w-full', className)}
            classNames={{
                months: 'flex flex-col w-full sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'w-full space-y-2',
                caption: 'flex justify-center pt-0 relative items-center',
                caption_label: 'text-lg font-bold',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                nav_button_previous: 'absolute left-1 hidden',
                nav_button_next: 'absolute right-1 hidden',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex w-full ',
                head_cell: 'w-full text-muted-foreground font-normal text-[0.9rem] border-b',
                row: 'flex flex-grow w-full mt-2',
                cell: cn(
                    'flex-grow p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
                    props.mode === 'range'
                        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                        : '[&:has([aria-selected])]:rounded-md'
                ),
                day: cn(
                    buttonVariants({ variant: 'ghost'}),
                    'flex-grow h-9 w-9 p-0 font-normal aria-selected:opacity-100'
                ),
                day_range_start: 'day-range-start',
                day_range_end: 'day-range-end',
                day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_outside:
                    'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4 hidden' />,
                IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4 hidden' />,
            }}
            {...props}
        />
    );
}
CustomCalendar.displayName = 'Calendar';

export { CustomCalendar };
