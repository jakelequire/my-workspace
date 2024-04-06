'use client';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { mails } from '../exampledata';

interface Mail {
    id: string;
    name: string;
    date: string;
    subject: string;
    text: string;
    labels: string[];
    read: boolean;
}

interface MailListProps {
    items: Mail[]
}

export default function MailList(): JSX.Element {
    const [mail, setMail] = useState<MailListProps>();

    const items = mails;

    return (
        <ScrollArea className='h-full w-full bg-transparent'>
            <div className='flex flex-col gap-2 p-4 pt-0'>
                {items?.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                        )}
                        >
                        <div className='flex w-full flex-col gap-1'>
                            <div className='flex items-center'>
                                <div className='flex items-center gap-2'>
                                    <div className='font-semibold'>{item.name}</div>
                                    {!item.read && (
                                        <span className='flex h-2 w-2 rounded-full bg-blue-600' />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        'ml-auto text-xs',

                                    )}>
                                    {formatDistanceToNow(new Date(item.date), {
                                        addSuffix: true,
                                    })}
                                </div>
                            </div>
                            <div className='text-xs font-medium'>{item.subject}</div>
                        </div>
                        <div className='line-clamp-2 text-xs text-muted-foreground'>
                            {item.text.substring(0, 300)}
                        </div>
                        {item.labels.length ? (
                            <div className='flex items-center gap-2'>
                                {item.labels.map((label) => (
                                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        ) : null}
                    </button>
                ))}
            </div>
        </ScrollArea>
    );
}

function getBadgeVariantFromLabel(label: string) {
    if (['work'].includes(label.toLowerCase())) {
        return 'default';
    }

    if (['personal'].includes(label.toLowerCase())) {
        return 'outline';
    }

    return 'secondary';
}
