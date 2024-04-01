'use client';
import { RecentDeployments } from "./recentDeployments";


export default function Deployments(): JSX.Element {



    return (
        <div className='flex h-full w-full gap-2'>
            <div className='flex h-full w-[60%] border rounded-lg'>

            </div>
            <div className='flex flex-col h-full w-[40%] border rounded-lg'>
                <div className='flex w-full h-[10%] px-5 py-3 mt-1 mb-5'>
                    <h1 className='text-lg font-bold'>Recent Deployments</h1>
                </div>
                <div className='flex w-full h-[90%]'>
                    <RecentDeployments />
                </div>
            </div>
        </div>
    )
}
