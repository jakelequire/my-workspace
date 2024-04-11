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
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { ReplyEmail } from "@/types/client/emailApp";
import { useEmailContext } from "../EmailContext";

export default function MailDisplay(): JSX.Element {
    const today = new Date()

    const { emails, openMail, deleteEmail, setOpenMail, setReplyEmailThread, setIsReplyEmailOpen } = useEmailContext()

    const sanitizeHtml = (html: string) => {
        return DOMPurify.sanitize(html);
    }

    const EmailContentSanitized = ({ htmlContent }: { htmlContent: string }) => {
        return <div className='w-full h-max px-4'>{parse(sanitizeHtml(htmlContent))}</div>
    }

    const deleteMail = () => {
        if(openMail) {
            deleteEmail(openMail.id)
            setOpenMail(undefined)
        }
    }


    const handleReply = () => {
        if(openMail) {
            setIsReplyEmailOpen(true)
            const replyEmail = {
                message: {
                    subject: `Re: ${openMail.subject}`,
                    body: {
                        contentType: "text",
                        content: `On ${format(new Date(openMail.receivedDateTime), 'PPpp')}, ${openMail.from.emailAddress.name} wrote: \n\n${openMail.body.content}`
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                                address: openMail.from.emailAddress.address
                            }
                        }
                    ],
                    ccRecipients: openMail.ccRecipients ? openMail.ccRecipients : [],
                },
                thread: [openMail]
            }

            //@ts-ignore
            setReplyEmailThread(replyEmail)
        }
    }

    const emailsWithSameConversationId = openMail?.conversationId ? emails.filter(email => email.conversationId === openMail.conversationId) : []
    emailsWithSameConversationId.reverse().pop()

    const ThreadItems = () => {
        if(emailsWithSameConversationId !== undefined) {
            return emailsWithSameConversationId.map((email: any, index: number ) => {
                return (
                    <div className='flex flex-col items-start p-4 h-max gap-4 border' key={index}>
                        <div className='flex flex-row justify-between w-full h-max'>
                            <div className='flex items-start gap-4 text-sm'>
                                <Avatar>
                                    <AvatarImage alt={email.from.emailAddress.name} />
                                    <AvatarFallback>
                                        {email.from.emailAddress.name
                                            .split(' ')
                                            .map((chunk: any) => chunk[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='font-semibold'>{email.from.emailAddress.name}</div>
                                    <div className='line-clamp-1 text-xs'>{email.subject}</div>
                                </div>
                            </div>
                            <div className='flex h-full w-max'>
                                {email.receivedDateTime && (
                                    <div className='ml-auto text-xs text-muted-foreground'>
                                        {format(new Date(email.receivedDateTime), 'PPp')}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col h-max w-full'>
                            <EmailContentSanitized htmlContent={email.body.content} />
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className='flex w-full h-full flex-col '>
            <div className='flex items-center p-2'>
                <div className='flex items-center gap-2'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!openMail}>
                                <Archive className='h-4 w-4' />
                                <span className='sr-only'>Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!openMail}>
                                <ArchiveX className='h-4 w-4' />
                                <span className='sr-only'>Move to junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!openMail} onClick={deleteMail}>
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
                                    <Button variant='ghost' size='icon' disabled={!openMail}>
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
                            <Button variant='ghost' size='icon' disabled={!openMail} onClick={handleReply}>
                                <Reply className='h-4 w-4' />
                                <span className='sr-only'>Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!openMail}>
                                <ReplyAll className='h-4 w-4' />
                                <span className='sr-only'>Reply all</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon' disabled={!openMail}>
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
                        <Button variant='ghost' size='icon' disabled={!openMail}>
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

                    <div className='flex flex-col whitespace-pre-wrap p-4 text-sm overflow-x-hidden overflow-scroll h-full w-full gap-4'>
                        <EmailContentSanitized htmlContent={openMail.body.content} />
                        <br />
                        <br />
                        <ThreadItems />
                    </div>

                    <Separator className='mt-auto' />

                    <div className='p-4 flex flex-col w-full min-h-[15%]'>
                        <form>
                            <div className='grid gap-4'>
                                <div className='flex items-center justify-center'>
                                    <Label
                                        htmlFor='mute'
                                        className='flex items-center gap-2 text-xs font-normal'>
                                        <Switch id='mute' aria-label='Mute thread' /> Mute this
                                        thread
                                    </Label>
                                    <Button
                                        onClick={(e) => {e.preventDefault(); handleReply()}}
                                        variant={'outline'}
                                        size='sm'
                                        className='ml-auto gap-2'>
                                        Reply
                                        <Reply size={16} />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='p-8 text-center text-muted-foreground'>No message selected</div>
            )}
        </div>
    );
}
