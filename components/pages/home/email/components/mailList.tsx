'use client';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { EmailResponse } from '../types';
import { useEmailContext } from '../EmailContext';
import { Button } from '@/components/ui/button';
import {
    Archive,
    ArchiveX,
    Clock,
    Forward,
    MoreVertical,
    Reply,
    ReplyAll,
    Trash2,
} from "lucide-react"
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
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
    const { setOpenMail, deleteEmail, openMail} = useEmailContext();

    const setMail = (mail: EmailResponse) => {
        setOpenMail(mail);
    }

    const deleteMail = (mail: EmailResponse) => {
        deleteEmail(mail.id);
    }

    const currentFolder = items?.find((item) => item.folder === 'Drafts');

    return (
        <div className='flex flex-col gap-2 p-4 pt-0'>
            { items ? items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setMail(item)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    className={cn(
                        `flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent ${openMail?.id === item.id ? 'bg-accent' : ''}`
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
                                {/* Hover for specific item and only display trash icon for that item */}

                            </div>
                            <div className={cn('ml-auto text-xs flex flex-row gap-4')}>
                                {hoveredItemId === item.id && (
                                    <>
                                        <button className='flex items-center'>
                                            <Reply size={16} />
                                        </button>
                                        <button 
                                            className='flex items-center hover:text-red-500' 
                                            onClick={() => { deleteMail(item) }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                                {formatDistanceToNow(new Date(item.createdDateTime), {
                                    addSuffix: true,
                                })}
                            </div>
                        </div>

                        <div className='text-xs font-medium'>
                            {item.subject}
                        </div>

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