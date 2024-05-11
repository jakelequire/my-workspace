'use client';

import DisplayUi from './displayUi';
import TopNavbar from './containers/topNavbar';
import Sidebar from './containers/sidebar';
import NewItemContainer from './containers/newItemContainer';
import PrimaryContent from './containers/primaryContent';




export default function CodeDocsInterface(): JSX. Element {



    return (
        <div className='flex flex-col h-full w-full'>

            <div className='flex h-[10%] w-full'>
                <div className='flex w-[20%] h-full'>
                    <NewItemContainer />
                </div>
                <div className='flex w-[80%] h-full'>
                    <TopNavbar />
                </div>
            </div>

            <div className='flex h-[90%] w-full'>
                <div className='flex w-[20%] h-full'>
                    <Sidebar />
                </div>

                <div className='flex w-[80%] h-full'>
                    <PrimaryContent>
                        <span className='foo'>test</span>
                    </PrimaryContent>
                </div>
            </div>
        </div>
    )
}


