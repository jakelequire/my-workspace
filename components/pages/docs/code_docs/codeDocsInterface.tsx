'use client';

import DisplayUi from './displayUi';
import { DocsProvider } from '../DocsContext';
import { TooltipProvider } from '@/components/ui/tooltip';




export default function CodeDocsInterface(): JSX. Element {



    return (
        <DocsProvider>
            <TooltipProvider delayDuration={0}>
                <div className='flex flex-col h-full w-full'>
                    <DisplayUi />
                </div>
            </TooltipProvider>
        </DocsProvider>
    )
}


