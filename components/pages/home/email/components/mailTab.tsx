'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useEmailContext } from "../EmailContext";
import MailList from "./mailList";
import SearchBar from "./searchbar";
import { Button } from "@/components/ui/button";
import { MailPlus } from "lucide-react";

export default function MailTab(): JSX.Element {
    const { currentFolder, setTab, emails } = useEmailContext();   
    const title = currentFolder.folder === "inbox" ? "Inbox" : currentFolder.folder;

    const focusedEmails = emails.filter((email) => email.inferenceClassification === 'focused');
    const otherEmails = emails.filter((email) => email.inferenceClassification === 'other');
    const unreadEmails = emails.filter((email) => !email.isRead);

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
                <Button size={'sm'} variant={'default'} className='flex justify-between gap-2'>
                    <MailPlus size={16}/>
                    New Email
                </Button>
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
