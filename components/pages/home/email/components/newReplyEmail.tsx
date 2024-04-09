'use client';
import {
    Trash2,
    File,
    CircleUser,
    MoreVertical,
    Send,
    X,
} from 'lucide-react';

import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';
import { useEmailContext, NewEmail as INewEmail } from '../EmailContext';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';


export default function NewReplyEmail(): JSX.Element {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [newEmail, setNewEmail] = useState<INewEmail>({
        message: {
            subject: '',
            body: {
                contentType: 'html',
                content: editorState.getCurrentContent().getPlainText(),
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: '',
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

    const { openMail, deleteEmail, setOpenMail, setIsNewEmailOpen, sendNewEmail } = useEmailContext();

    const onChange = (editorState: any) => {
        setEditorState(editorState);
    };

    const handleKeyCommand = (command: any, editorState: any) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                onChange(newState);
                return 'handled';
            }
            return 'not-handled';
    };


    return (
        <div className='flex w-full h-full flex-col '>
            <div className='flex items-center p-2'>
                <div className='flex items-center gap-2'>
                    <h2 className='pl-2 pr-2 text-lg font-semibold text-white'>
                        Reply to {/* reply name */}
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
                                onClick={deleteMail}>
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
                            onClick={sendEmail}
                        >
                            <span className='font-semibold'>Send</span>
                            <Send size={16} />
                        </Button>
                    </div>
                </div>

                <Separator orientation='vertical' className='mx-2 h-6' />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'ghost'} size={'icon'} onClick={closeNewEmail}>
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

                    <div className='p-4 flex flex-col w-full h-full'>
                        <Editor
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={onChange}
                            spellCheck={true}
                            autoComplete='on'
                            onTab={(e) => {
                                e.preventDefault();
                                // make four spaces instead of a tab
                                const newState = RichUtils.onTab(e, editorState, 4);
                                if (newState) {
                                    onChange(newState);
                                }
                            }}
                        />
                    </div>
                </div>
            
            {/* -------------------------------------------------------------- */}
        </div>
    );
}

