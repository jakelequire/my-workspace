'use client';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { EmailResponse } from '../types';
import { useEmailContext } from '../EmailContext';
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
    items: EmailResponse[];
}

export default function MailList({ items }: MailListProps): JSX.Element {
    const { setOpenMail } = useEmailContext();

    const setMail = (mail: EmailResponse) => {
        setOpenMail(mail);
    }

    const currentFolder = items?.find((item) => item.folder === 'Drafts');

    return (
        <div className='flex flex-col gap-2 p-4 pt-0'>
            { items ? items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setMail(item)}
                    className={cn(
                        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                    )}>
                    <div className='flex w-full flex-col gap-1'>
                        <div className='flex items-center'>
                            <div className='flex items-center gap-2'>
                                <div className='font-semibold'>
                                    { currentFolder ? "" : item.from.emailAddress.name }
                                </div>
                                {!item.isRead && (
                                    <span className='flex h-2 w-2 rounded-full bg-blue-600' />
                                )}
                            </div>
                            <div className={cn('ml-auto text-xs')}>
                                {formatDistanceToNow(new Date(item.createdDateTime), {
                                    addSuffix: true,
                                })}
                            </div>
                        </div>
                        <div className='text-xs font-medium'>{item.subject}</div>
                    </div>
                    <div className='line-clamp-2 text-xs text-muted-foreground'>
                        {item.bodyPreview.substring(0, 300)}
                    </div>
                    {/* {item.labels.length ? (
                        <div className='flex items-center gap-2'>
                            {item.labels.map((label) => (
                                <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    ) : null} */}
                </button>
            )) : null }
        </div>
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
