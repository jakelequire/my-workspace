'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Button } from '@/components/ui/button';
import {
    Reply,
    FlagTriangleRight,
    Trash2,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { toast } from 'sonner';

import { useEmailContext } from '../EmailContext';
import { EmailResponse } from '@/types/client/emailApp';


interface MailListProps {
    items: EmailResponse[];
}

export default function MailList({ items }: MailListProps): JSX.Element {
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

    const { 
        setOpenMail,
        deleteEmail,
        openMail,
        readEmail,
        isNewEmailOpen,
        setIsNewEmailOpen,
        flagEmail,
    } = useEmailContext();

    const setMail = (mail: EmailResponse) => {
        if(isNewEmailOpen) setIsNewEmailOpen(false);
        readEmail(mail.id);
        setOpenMail(mail);
    }

    const deleteMail = (mail: EmailResponse) => {
        if(mail.id === openMail?.id) setOpenMail(undefined);
        deleteEmail(mail.id).then(() => {
            toast.success('Email has been deleted.', {
                description: `Email: ${mail.subject} has been deleted.`,
                duration: 3000,
            });
        }).catch((error) => {
            console.error("[MailList] deleteMail error: ", error);
            toast.error('An error occurred while deleting the email.', {
                description: `Email: ${mail.subject} could not be deleted.`,
                duration: 3000,
            });
        });
    }

    const currentFolder = items?.find((item) => item.folder === 'Drafts');

    const handleButtonClick = (item: EmailResponse) => {
        setMail(item)
    }

    const handleFlagEmail = (item: EmailResponse) => {
        const itemId = item.id;
        flagEmail(itemId);
    }

    const isFlagged = (item: EmailResponse)=> {
        if(item.flag.flagStatus === 'flagged') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='flex flex-col gap-2 p-4 pt-0'>
            { items ? items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleButtonClick(item)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    className={cn(
                        `flex flex-row items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all
                        ${openMail?.id === item.id ? 'bg-accent' : ''}
                        ${isFlagged(item) ? 'border-l-4 border-l-teal-600' : ''}
                        hover:bg-accent
                        `
                    )}>

                    <div className='flex h-full justify-center items-center gap-2'>
                            <Avatar>
                                <AvatarImage alt={item.from.emailAddress.name} className='border border-white' />
                                <AvatarFallback className='border border-white bg-transparent'>
                                    {item.from.emailAddress.name
                                        .split(' ')
                                        .map((chunk) => chunk[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                    </div>

                    <div className='flex w-full flex-col gap-1'>
                        <div className='flex w-full flex-col gap-1'>
                            <div className='flex items-center'>

                                <div className='flex items-center gap-2'>
                                    <div className={`
                                        font-semibold 
                                        ${item.isRead ? 'brightness-75' : ''}
                                        ${item.id === openMail?.id ? 'text-white brightness-100' : ''}
                                        `}>
                                        { currentFolder ? "" : item.from.emailAddress.name }
                                    </div>
                                    {!item.isRead && (
                                        <span className='flex h-2 w-2 rounded-full bg-blue-600' />
                                    )}
                                
                                </div>

                                <div className={cn('ml-auto text-xs flex flex-row gap-2 px-2')}>
                                    {(hoveredItemId === item.id || openMail?.id === item.id) && (
                                        <>
                                            <button 
                                                className={`flex items-center hover:text-teal-600 ${isFlagged(item) ? 'text-teal-600' : ''}`}
                                                onClick={() => handleFlagEmail(item)}>
                                                <FlagTriangleRight size={16} />
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
                            
                            <div className={
                                `text-xs font-medium 
                                ${item.isRead ? 'brightness-75' : ''}
                                ${item.id === openMail?.id ? 'text-white brightness-100' : ''}
                            `}>
                                {item.subject}
                            </div>
                        </div>

                        <div className={`
                            line-clamp-2 text-xs text-muted-foreground
                                ${!item.isRead ? 'brightness-125' : ''}
                                ${item.id === openMail?.id ? 'brightness-125' : ''}
                            `}>
                            {item.bodyPreview.substring(0, 300)}
                        </div>
                    </div>

                </button>
            )) : null }
        </div>
    );
}
