'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useEmailContext } from "../EmailContext";
import MailList from "./mailList";
import SearchBar from "./searchbar";
import { Button } from "@/components/ui/button";
import { 
    MailPlus,
    RefreshCcw,
} from "lucide-react";
import { useState } from "react";

export default function MailTab(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);

    const { currentFolder, setTab, emails, refreshEmails, setIsNewEmailOpen, retrieveOtherEmails} = useEmailContext();   
    const title = currentFolder.folder === "inbox" ? "Inbox" : currentFolder.folder;

    const focusedEmails = emails.filter((email) => email.inferenceClassification === 'focused');
    const otherEmails = emails.filter((email) => email.inferenceClassification === 'other');
    const unreadEmails = emails.filter((email) => !email.isRead);

    const refreshEmail = () => {
        const refresh = async () => {
            refreshEmails()
        };
        setLoading(true);
        refresh().then(() => {
            setLoading(false);
        })
    }

    const newEmail = () => {
        setIsNewEmailOpen(true);
    }

    return (
        <Tabs defaultValue='focused' className='flex flex-col w-full'>
            <div className='flex w-full justify-between items-center px-4 py-2'>
                <h1 className='flex text-2xl font-bold'>{title}</h1>
                <TabsList className='flex ml-auto'>

                    <TabsTrigger 
                        value='focused' 
                        className='text-zinc-600 dark:text-zinc-200' 
                    >
                        Focused
                    </TabsTrigger>

                    <TabsTrigger 
                        value='other' 
                        className='text-zinc-600 dark:text-zinc-200'
                        onClick={retrieveOtherEmails}
                    >
                        Other
                    </TabsTrigger>

                    <TabsTrigger 
                        value='unread' 
                        className='text-zinc-600 dark:text-zinc-200'
                    >
                        Unread
                    </TabsTrigger>

                </TabsList>
            </div>

            <div className='flex w-full justify-between items-center px-4 py-2 mb-1'>
                <Button 
                    size={'sm'} 
                    variant={'default'} 
                    className='flex justify-between gap-2'
                    onClick={newEmail}
                >
                    <MailPlus size={16}/>
                    New Email
                </Button>

                <div className='flex gap-2'>
                <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                variant='outline'
                                size='icon'
                                onClick={refreshEmail}
                                className={`${loading ? '' : ''}`}
                            >
                                <RefreshCcw size={16} />
                                <span className='sr-only'>Refresh</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh</TooltipContent>
                    </Tooltip>
                </div>

            </div>

            <Separator />

            <SearchBar />


            <TabsContent value='focused'>
                <MailList items={focusedEmails} />
            </TabsContent>

            <TabsContent value='other'>
                <MailList items={otherEmails} />
            </TabsContent>

            <TabsContent value='unread'>
                <MailList items={unreadEmails} />
            </TabsContent>
        </Tabs>
    )
}
