'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import MailList from './components/mailList';
import MailDisplay from './components/mailDisplay';
import Nav from './components/nav';
import { AccountSwitcher } from './components/accountSwitcher';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { mails, accounts } from './exampledata';

export default function Email(): JSX.Element {
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup direction='horizontal' className='h-full w-full rounded-lg border'>
                <ResizablePanel defaultSize={20}>
                    <div className='flex w-full h-full flex-col items-center justify-start'>
                        <div className='flex w-full justify-center self-center items-center py-2 px-4'>
                            <AccountSwitcher isCollapsed={false} accounts={accounts} />
                        </div>
                        <Separator />
                        <Nav />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40}>
                    <div className='flex w-full h-full flex-col items-center justify-start overflow-auto gap-4'>
                        <InboxContainer />
                        <MailList />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40}>
                    <div className='flex h-full items-center justify-center '>
                        <MailDisplay />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}

function InboxContainer(): JSX.Element {
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
    );
}

export function Search({ className = "" }: { className?: string }) {
    return (
        <div>
            <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
            />
        </div>
    )
}