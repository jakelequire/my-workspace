'use client';
import { useDocsContext } from "../../DocsContext";
import { pages } from "../pages/pages";
import { useState, useEffect } from 'react';


export default function TopNavbar(): JSX.Element {


    return (
        <div className='flex h-full w-full border'>
            <div className='flex w-full h-full px-4 py-2'>
                <NavigationMenu />
            </div>
        </div>
    )
}


function NavigationMenu(): JSX.Element {
    const [currentItem, setCurrentItem] = useState<string>('Homepage');
    const { currentDoc, setCurrentDoc } = useDocsContext();


    useEffect(() => {
        setCurrentDoc(pages.homepage.page)
    },[setCurrentDoc])


    const handleClick = (item: string) => {
        setCurrentItem(item);
    }


    const navbarItems = (Object.keys(pages) as (keyof typeof pages)[]).map((key) => {
        const page = pages[key];
        const title = page.title;

        // Don't render the 'New Item' page in the navbar menu
        // But keep it in the pages object.
        if(title === 'New Item') return null;

        const isActive = currentItem === title ? 'bg-gray-500' : 'bg-gray-800';
        const isNewItemActive = currentItem === 'New Item' ? 'bg-transparent' : 'bg-transparent';

        return (
            <div key={key} className='flex w-1/5 h-full border'>
                <button 
                    className={`w-full h-full transition-all hover:bg-gray-700 focus:outline-none
                        ${isActive}
                        ${isNewItemActive}
                    `}
                    onClick={() => {
                        setCurrentDoc(page.page)
                        handleClick(title)
                    }} 
                >
                    {page.title}
                </button>
            </div>
        );
    });


    return (
        <div className='flex h-full w-full'>
            <div className='flex flex-row w-full h-[70%] p-2 gap-2'>
                {navbarItems}
            </div>
        </div>
    )
}
