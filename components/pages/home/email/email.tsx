'use client';
import MailTab from './components/mailTab';
import MailDisplay from './components/mailDisplay';
import Nav from './components/nav';
import { AccountSwitcher } from './components/accountSwitcher';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from "@/components/ui/separator"
import { mails, accounts } from './exampledata';
import { useEmailContext } from './EmailContext';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';



export default function Email(): JSX.Element {
    const { emails, tab } = useEmailContext();
    
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup direction='horizontal' className='h-full w-full rounded-lg border'>
                <ResizablePanel defaultSize={15}>
                    <div className='flex w-full h-full flex-col items-center justify-start'>
                        <div className='flex w-full justify-center self-center items-center py-2 px-4'>
                            <AccountSwitcher isCollapsed={false} accounts={accounts} />
                        </div>
                        <Separator />
                        <Nav />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={30}>
                    <div className='flex w-full h-full flex-col items-center justify-start overflow-y-scroll overflow-x-hidden gap-4'>
                        <MailTab />
                    </div>
                </ResizablePanel>

                {/* <ResizableHandle withHandle /> */}

                <ResizablePanel defaultSize={55}>
                    <div className='flex h-full items-center justify-center overflow-hidden'>
                        <MailDisplay />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
