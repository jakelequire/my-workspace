'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useEmailContext } from "../EmailContext";

export default function InboxHeader(): JSX.Element {
    const { currentFolder, setTab } = useEmailContext();   
    const title = currentFolder.folder === "inbox" ? "Inbox" : currentFolder.folder;

    const handleTabChange = (value: string) => {
        setTab(value);
    }

    return (
        <Tabs defaultValue='focused' className='flex flex-col w-full'>
            <div className='flex w-full justify-between items-center px-4 py-2'>
                <h1 className='flex text-2xl font-bold'>{title}</h1>
                <TabsList className='flex ml-auto'>

                    <TabsTrigger 
                        value='focused' 
                        className='text-zinc-600 dark:text-zinc-200' 
                        onClick={() => {
                            handleTabChange('Focused');
                        }}
                    >
                        Focused
                    </TabsTrigger>

                    <TabsTrigger 
                        value='other' 
                        className='text-zinc-600 dark:text-zinc-200'
                        onClick={() => {
                            handleTabChange('Other');
                        }}
                    >
                        Other
                    </TabsTrigger>

                    <TabsTrigger 
                        value='unread' 
                        className='text-zinc-600 dark:text-zinc-200'
                        onClick={() => {
                            handleTabChange('Unread');
                        }}
                    >
                        Unread
                    </TabsTrigger>

                </TabsList>
            </div>
            <Separator />
        </Tabs>
    )
}
