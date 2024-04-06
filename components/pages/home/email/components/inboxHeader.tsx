'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"


export default function InboxHeader(): JSX.Element {
    

    return (
        <Tabs defaultValue='all' className='flex flex-col w-full'>
            <div className='flex w-full justify-between items-center px-4 py-2'>
                <h1 className='flex text-2xl font-bold'>Inbox</h1>
                <TabsList className='flex ml-auto'>
                    <TabsTrigger value='all' className='text-zinc-600 dark:text-zinc-200'>
                        All mail
                    </TabsTrigger>
                    <TabsTrigger value='unread' className='text-zinc-600 dark:text-zinc-200'>
                        Unread
                    </TabsTrigger>
                </TabsList>
            </div>
            <Separator />
        </Tabs>
    )
}
