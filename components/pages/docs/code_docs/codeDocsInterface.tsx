'use client';

import TopNavbar from './topNavbar/topNavbar';
import Sidebar from './sidebar/sidebar';
import PrimaryContent from './primaryContent/primaryContent';

export default function CodeDocsInterface(): JSX. Element {



    return (
        <div className='flex flex-col h-full w-full border'>

            <div className='flex h-[10%] w-full border'>
                <TopNavbar />
            </div>

            <div className='flex h-[90%] w-full border'>
                <div className='flex w-[20%] h-full'>
                    <Sidebar />
                </div>

                <div className='flex w-[80%] h-full'>
                    <PrimaryContent />
                </div>
            </div>
        </div>
    )
}


