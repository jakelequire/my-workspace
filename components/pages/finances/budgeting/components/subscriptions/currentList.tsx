'use client';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBudgetingContext, SubscriptionItem } from "../../BudgetingContext";


export default function CurrentList(): JSX.Element {
    const { subscriptions } = useBudgetingContext();


    const ListItem = ({ ...props }: SubscriptionItem) => {
        const {companyName, amount, date, frequency, pfpUrl } = props;

        const url = pfpUrl ? pfpUrl : '';

        return (
            <a className='flex h-20 w-full border rounded-lg py-4 px-6 gap-6 transition-all hover:bg-accent'>
                <div className='flex h-full w-[10%]'>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src={url} className='' />
                        <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex h-full w-[90%]'>
                    <div className='flex h-full w-[70%] flex-col'>
                        <h1 className='text-lg font-bold'>
                            {companyName}
                        </h1>
                        <h2 className='text-sm font-base text-neutral-400'>
                            {frequency}
                        </h2>
                    </div>
                    <div className='flex justify-end items-end h-full w-[30%] flex-col'>
                        <h1 className='text-lg font-bold'>
                            ${amount}
                        </h1>
                        <h2 className='text-sm font-base text-neutral-400'>
                            {date}
                        </h2>
                    </div>
                </div>
            </a>
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
                            {subscriptions ? subscriptions.map((item, index) => (
                                <ListItem key={index} {...item} />
                            )): null }
                        </div>

                        <Separator />

                        <div className='flex flex-col w-full'>
                            <h1 className='text-xl font-bold text-neutral-400'>Recently Deactivated</h1>
                            <p className='text-xs text-neutral-500 mb-2 italic'>Removed within 30 days</p>
                        </div>

                        <div className='flex flex-col w-full h-max gap-2'>

                        </div>
                    </div>
            </div>
        </ScrollArea>
    )
}

