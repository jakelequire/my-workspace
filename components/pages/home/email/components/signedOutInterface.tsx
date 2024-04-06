'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from "@/components/ui/separator"
import { AccountSwitcher } from './accountSwitcher';




export default function SignedOutInterface(): JSX.Element {


    return (
        <ResizablePanelGroup direction='horizontal' className='h-full w-full rounded-lg border'>
            <ResizablePanel defaultSize={15}>
                <div className='flex w-full h-full flex-col items-center justify-start'>
                    <div className='flex w-full justify-center self-center items-center py-2 px-4'>
                        <AccountSwitcher isCollapsed={false} accounts={[]} />
                    </div>
                    <Separator />
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={45}>
                <div className='flex w-full h-full flex-col items-center justify-start overflow-auto gap-4'>
                
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={40}>
                <div className='flex h-full items-center justify-center '>
                
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
