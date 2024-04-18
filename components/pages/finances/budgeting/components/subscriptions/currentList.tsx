'use client';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area";


export default function CurrentList(): JSX.Element {



    const ListItem = () => {
        return (
            <div className='flex h-20 w-full border rounded-lg py-4 px-6 gap-6 transition-all hover:bg-accent'>
                <div className='flex h-full w-[10%]'>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src={''} className='' />
                        <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex h-full w-[90%]'>
                    <div className='flex h-full w-[70%] flex-col'>
                        <h1 className='text-lg font-bold'>Facebook</h1>
                        <h2 className='text-sm font-base text-neutral-400'>Monthly</h2>
                    </div>
                    <div className='flex justify-end items-end h-full w-[30%] flex-col'>
                        <h1 className='text-lg font-bold'>$0.00</h1>
                        <h2 className='text-sm font-base text-neutral-400'>12/12/2022</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ScrollArea className='w-full h-full border-2 rounded-lg'>
            <div className='flex flex-col w-full h-[100%] py-4 px-6 gap-6'>
                    <div className="flex w-full h-full flex-col gap-4">
                        <div className='flex flex-col w-full'>
                            <h1 className='text-xl font-bold mb-2'>Active Subscriptions</h1>
                        </div>

                        <div className='flex flex-col w-full h-max gap-2'>
                            <ListItem />
                            <ListItem />
                            <ListItem />
                            <ListItem />
                        </div>

                        <Separator />

                        <div className='flex flex-col w-full'>
                            <h1 className='text-xl font-bold text-neutral-400'>Recently Deactivated</h1>
                            <p className='text-xs text-neutral-500 mb-2 italic'>Removed within 30 days</p>
                        </div>

                        <div className='flex flex-col w-full h-max gap-2'>
                            <ListItem />
                            <ListItem />
                            <ListItem />
                            <ListItem />
                            <ListItem />
                        </div>
                    </div>
            </div>
        </ScrollArea>
    )
}

