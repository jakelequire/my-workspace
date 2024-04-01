"use client";
import { useCodeSpaceContext } from "../../CodeSpaceContext";


export default function Builds(): JSX.Element {



    return (
        <div className='flex h-full w-full gap-2'>
            <div className='flex h-full w-[70%] border rounded-lg'>

            </div>
            <div className='flex flex-col h-full w-[30%] border rounded-lg'>
                <div className='flex w-full h-[10%] px-5 py-3'>
                    <h1 className='text-lg font-bold'>Recent Builds</h1>
                </div>
                <div className='flex w-full h-[90%]'>

                </div>
            </div>
        </div>
    )
}
