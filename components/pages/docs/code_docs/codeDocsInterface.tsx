'use client';

import DisplayUi from './displayUi';
import { DocsProvider } from '../DocsContext';




export default function CodeDocsInterface(): JSX. Element {



    return (
        <DocsProvider>
            <div className='flex flex-col h-full w-full'>
                <DisplayUi />
            </div>
        </DocsProvider>
    )
}


