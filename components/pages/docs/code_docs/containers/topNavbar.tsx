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
    const { setCurrentDoc } = useDocsContext();

    

    useEffect(() => {
        setCurrentDoc(pages.homepage.page)
    },[setCurrentDoc])

    const navbarItems = Object.keys(pages).map((key, index) => {
        //@ts-ignore
        const page = pages[key];
        return (
            <div key={key} className='flex w-1/4 h-full'>
                <button onClick={() => setCurrentDoc(page.page)} className='w-full h-full'>
                    {page.title}
                </button>
            </div>
        );
    });



    return (
        <div className='flex h-full w-full border'>
            <div className='flex flex-row w-full h-full'>
                {navbarItems}
            </div>
        </div>
    )
}
