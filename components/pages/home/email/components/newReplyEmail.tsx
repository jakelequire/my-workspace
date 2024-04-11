'use client';
import {
    Trash2,
    File,
    CircleUser,
    MoreVertical,
    Send,
    X,
} from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { format } from "date-fns/format"

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';
import { useEmailContext } from '../EmailContext';
import { NewEmail as INewEmail } from '@/types/client/emailApp';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export default function NewReplyEmail(): JSX.Element {
    const { openMail, deleteEmail, setOpenMail, setIsNewEmailOpen, setIsReplyEmailOpen, replyEmailThread, replyToEmail } = useEmailContext();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [newEmail, setNewEmail] = useState<INewEmail>({
        message: {
            subject: replyEmailThread?.thread[0].subject || '',
            body: {
                contentType: 'html',
                content: editorState.getCurrentContent().getPlainText(),
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: replyEmailThread?.thread[0].from.emailAddress.address || '',
                    },
                },
            ],
            ccRecipients: [
                {
                    emailAddress: {
                        address: '',
                    },
                },
            ],
        },
        saveToSentItems: 'true',
    
    });

    const sanitizeHtml = (html: string) => {
        return DOMPurify.sanitize(html);
    }

    const EmailContentSanitized = ({ htmlContent }: { htmlContent: string }) => {
        return <div className='w-full h-full px-4'>{parse(sanitizeHtml(htmlContent))}</div>
    }

    const onChange = (editorState: EditorState) => {
        setEditorState(editorState);
    
        // Update the newEmail state with the latest editor content
        const content = editorState.getCurrentContent().getPlainText();
        setNewEmail((prevNewEmail) => ({
            ...prevNewEmail,
            message: {
                ...prevNewEmail.message,
                body: {
                    ...prevNewEmail.message.body,
                    content: content,
                },
            },
        }));
    };

    const handleKeyCommand = (command: any, editorState: any) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                onChange(newState);
                return 'handled';
            }
            return 'not-handled';
    };

    const handleClose = () => {
        setIsReplyEmailOpen(false);
        setOpenMail(undefined);
    }


    const handleNewReplyEmail = async () => {
        if(!replyEmailThread) return;
        await replyToEmail(newEmail, replyEmailThread?.thread[0].id).then(() => {
            setIsReplyEmailOpen(false);
            setOpenMail(undefined);
        }).catch((error) => {
            console.error("[useEmailProvider] handleNewReplyEmail error: ", error);
        });
    }


    const ThreadItems = () => {
        if(replyEmailThread?.thread !== undefined) {
            return replyEmailThread.thread.map((email: any, index: number) => {
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
                                    <div className='line-clamp-1 text-xs'>
                                        <span className='font-medium'>Reply-To:</span> {email.sender.emailAddress.address}
                                    </div>
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
                    <h2 className='pl-2 pr-2 text-lg font-semibold text-white'>
                        Reply to
                        <span className='self-center ml-2 font-normal'>
                            {replyEmailThread?.thread[0].from.emailAddress.name}
                        </span>
                    </h2>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <CircleUser className='h-4 w-4' />
                                <span className='sr-only'>Contacts</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Contacts</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <File className='h-4 w-4' />
                                <span className='sr-only'>Move to drafts</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to drafts</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => {}}>
                                <Trash2 className='h-4 w-4' />
                                <span className='sr-only'>Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>

                    <Separator orientation='vertical' className='mx-1 h-6' />

                    <Tooltip>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
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
                        <TooltipContent>More...</TooltipContent>
                    </Tooltip>
                </div>
                <div className='ml-auto flex items-center gap-2'>
                    <div className='flex w-max items-center pr-4'>
                        <Button 
                            variant='default'
                            size='icon'
                            className='flex w-max gap-2 px-8 h-8'
                            onClick={handleNewReplyEmail}
                        >
                            <span className='font-semibold'>Send</span>
                            <Send size={16} />
                        </Button>
                    </div>
                </div>

                <Separator orientation='vertical' className='mx-2 h-6' />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'ghost'} size={'icon'} onClick={handleClose}>
                            <X className='h-4 w-4' />
                            <span className='sr-only'>Close</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Close</TooltipContent>
                </Tooltip>

            </div>


            <Separator />

            {/* ------------------------------------------------------------ */}
            
                <div className='flex flex-1 flex-col h-full'>
                    <div className='flex w-full items-start p-4 h-max'>

                        <div className='flex w-full items-start gap-4 text-sm'>
                            <div className='grid gap-2 w-full'>
                                <div className='flex flex-row justify-center gap-1'>
                                    <span className='text-xs self-center text-muted-foreground pr-2'>To</span>
                                    <Input 
                                        className='text-xs rounded-none border-b-2 border-t-0 border-x-0'
                                        placeholder='Recipient'
                                        value={newEmail.message.toRecipients[0].emailAddress.address}
                                        onChange={(e) => {
                                            setNewEmail({
                                                ...newEmail,
                                                message: {
                                                    ...newEmail.message,
                                                    toRecipients: [
                                                        {
                                                            emailAddress: {
                                                                address: e.target.value,
                                                            },
                                                        },
                                                    ],
                                                },
                                            });
                                        }}
                                    />
                                </div>
                                <div className='flex flex-row'>
                                    <span className='text-xs self-center text-muted-foreground pr-2'>Cc</span>
                                    <Input 
                                        className='text-xs rounded-none border-b-2 border-t-0 border-x-0' 
                                        placeholder='Cc'
                                        value={newEmail.message.ccRecipients[0].emailAddress.address}
                                        onChange={(e) => {
                                            setNewEmail({
                                                ...newEmail,
                                                message: {
                                                    ...newEmail.message,
                                                    ccRecipients: [
                                                        {
                                                            emailAddress: {
                                                                address: e.target.value,
                                                            },
                                                        },
                                                    ],
                                                },
                                            });
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col pt-2'>
                                    <Input 
                                        className='text-xs rounded-none border-b-2 border-t-0 border-x-0' 
                                        placeholder='Subject'
                                        value={newEmail.message.subject}
                                        onChange={(e) => {
                                            setNewEmail({
                                                ...newEmail,
                                                message: {
                                                    ...newEmail.message,
                                                    subject: e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <Separator />

                    <div className='p-4 flex flex-col w-full h-full gap-2 overflow-y-scroll overflow-x-hidden'>
                        
                        <div className='flex flex-col gap-2 w-full min-h-[60%] p-2 border overflow-x-hidden overflow-y-scroll'>
                            <Editor
                                editorState={editorState}
                                handleKeyCommand={handleKeyCommand}
                                onChange={onChange}
                                spellCheck={true}
                                autoComplete='on'
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full h-max'>
                            <ThreadItems />
                        </div>

                    </div>


                </div>
        </div>
    );
}
