'use client';

import TopNavbar from './containers/topNavbar';
import Sidebar from './containers/sidebar';
import NewItemContainer from './containers/newItemContainer';
import PrimaryContent from './containers/primaryContent';

import { useDocsContext } from '../DocsContext';

export default function DisplayUi(): JSX.Element {
    const { currentDoc } = useDocsContext();


    return (
        <div className='flex flex-col h-full w-full border'>
        
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
                        <span className='foo'>
                            {currentDoc}
                        </span>
                    </PrimaryContent>
                </div>
            </div>
        
        </div>
    )
}

