'use client';
import { addDays } from "date-fns/addDays"
import { addHours } from "date-fns/addHours"
import { format } from "date-fns/format"
import { nextSaturday } from "date-fns/nextSaturday"
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

import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Mail, mails } from "../exampledata";
import { useEmailContext } from "../EmailContext";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface MailDisplayProps {
    mail: Mail | null
}


export default function MailDisplay(): JSX.Element {
    const today = new Date()
    const mail = mails.find((mail) => mail)

    const { openMail } = useEmailContext()

    const sanitizeHtml = (html: string) => {
        return DOMPurify.sanitize(html);
    }

    const EmailContentSanitized = ({ htmlContent }: { htmlContent: string }) => {
        return <div className='w-full h-full px-4'>{parse(sanitizeHtml(htmlContent))}</div>
    }

    return (
        <div className='flex w-full h-full flex-col '>
            <div className='flex items-center p-2'>
                <div className='flex items-center gap-2'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <Archive className='h-4 w-4' />
                                <span className='sr-only'>Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <ArchiveX className='h-4 w-4' />
                                <span className='sr-only'>Move to junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <Trash2 className='h-4 w-4' />
                                <span className='sr-only'>Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>
                    <Separator orientation='vertical' className='mx-1 h-6' />
                    <Tooltip>
                        <Popover>
                            <PopoverTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button variant='ghost' size='icon' disabled={!mail}>
                                        <Clock className='h-4 w-4' />
                                        <span className='sr-only'>Snooze</span>
                                    </Button>
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <PopoverContent className='flex w-[535px] p-0'>
                                <div className='flex flex-col gap-2 border-r px-2 py-4'>
                                    <div className='px-4 text-sm font-medium'>Snooze until</div>
                                    <div className='grid min-w-[250px] gap-1'>
                                        <Button
                                            variant='ghost'
                                            className='justify-start font-normal'>
                                            Later today{' '}
                                            <span className='ml-auto text-muted-foreground'>
                                                {format(addHours(today, 4), 'E, h:m b')}
                                            </span>
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            className='justify-start font-normal'>
                                            Tomorrow
                                            <span className='ml-auto text-muted-foreground'>
                                                {format(addDays(today, 1), 'E, h:m b')}
                                            </span>
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            className='justify-start font-normal'>
                                            This weekend
                                            <span className='ml-auto text-muted-foreground'>
                                                {format(nextSaturday(today), 'E, h:m b')}
                                            </span>
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            className='justify-start font-normal'>
                                            Next week
                                            <span className='ml-auto text-muted-foreground'>
                                                {format(addDays(today, 7), 'E, h:m b')}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <Calendar />
                                </div>
                            </PopoverContent>
                        </Popover>
                        <TooltipContent>Snooze</TooltipContent>
                    </Tooltip>
                </div>
                <div className='ml-auto flex items-center gap-2'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <Reply className='h-4 w-4' />
                                <span className='sr-only'>Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <ReplyAll className='h-4 w-4' />
                                <span className='sr-only'>Reply all</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!mail}>
                                <Forward className='h-4 w-4' />
                                <span className='sr-only'>Forward</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Forward</TooltipContent>
                    </Tooltip>
                </div>
                <Separator orientation='vertical' className='mx-2 h-6' />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' disabled={!mail}>
                            <MoreVertical className='h-4 w-4' />
                            <span className='sr-only'>More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                        <DropdownMenuItem>Star thread</DropdownMenuItem>
                        <DropdownMenuItem>Add label</DropdownMenuItem>
                        <DropdownMenuItem>Mute thread</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator />

            {/* ------------------------------------------------------------ */}
            {openMail ? (
                <div className='flex flex-1 flex-col h-full'>
                    <div className='flex items-start p-4 h-max'>
                        <div className='flex items-start gap-4 text-sm'>
                            <Avatar>
                                <AvatarImage alt={openMail.from.emailAddress.name} />
                                <AvatarFallback>
                                    {openMail.from.emailAddress.name
                                        .split(' ')
                                        .map((chunk) => chunk[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='font-semibold'>{openMail.from.emailAddress.name}</div>
                                <div className='line-clamp-1 text-xs'>{openMail.subject}</div>
                                <div className='line-clamp-1 text-xs'>
                                    <span className='font-medium'>Reply-To:</span> {openMail.sender.emailAddress.address}
                                </div>
                            </div>
                        </div>
                        {openMail.receivedDateTime && (
                            <div className='ml-auto text-xs text-muted-foreground'>
                                {format(new Date(openMail.receivedDateTime), 'PPpp')}
                            </div>
                        )}
                    </div>
                    <Separator />

                    <div className='flex-1 whitespace-pre-wrap p-4 text-sm overflow-x-hidden overflow-scroll h-[55%] w-full'>
                        <EmailContentSanitized htmlContent={openMail.body.content} />
                    </div>

                    <Separator className='mt-auto' />
                    <div className='p-4 flex flex-col w-full h-[30%]'>
                        <form>
                            <div className='grid gap-4'>

                                {/* -------------------------------------
                                *   TODO
                                *       - Add attachments
                                *       - Add CC/BCC
                                *       - Add subject
                                *       - Able to write in markdown
                                *       - Add labels
                                ---------------------------------------- */}
                                <Textarea 
                                    className='p-4 whitespace-pre-wrap resize-none h-[125px] overflow-auto' 
                                    placeholder={`Reply to ${openMail.from.emailAddress.name}...`} 
                                />
                                {/* ----------------------------------------------------------------------- */}

                                <div className='flex items-center'>
                                    <Label
                                        htmlFor='mute'
                                        className='flex items-center gap-2 text-xs font-normal'>
                                        <Switch id='mute' aria-label='Mute thread' /> Mute this
                                        thread
                                    </Label>
                                    <Button
                                        onClick={(e) => e.preventDefault()}
                                        size='sm'
                                        className='ml-auto'>
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='p-8 text-center text-muted-foreground'>No message selected</div>
            )}
            {/*  ------------------------------------------------------------ */}

        </div>
    );
}
