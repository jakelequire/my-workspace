'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';




export default function OpenedItem(): JSX.Element {


    return (
        <div className='flex flex-col w-full h-full border-2 rounded-lg py-6 px-6 gap-6'>

            <div className='flex flex-row justify-center w-full h-[35%] border gap-4 p-4'>
                <div className='flex items-center justify-center h-full'>
                        <Avatar className='h-20 w-20'>
                            <AvatarImage src={''} className='' />
                            <AvatarFallback>FB</AvatarFallback>
                        </Avatar>
                </div>
                <div className='flex justify-center items-center h-full w-[90%]'>
                    <div className='flex justify-center h-full w-[75%] flex-col'>
                        <h1 className='text-lg font-bold'>Facebook</h1>
                        <h2 className='text-sm font-base text-neutral-400'>Monthly</h2>
                        <h2 className='text-sm font-base text-neutral-400'>Due: 12/12/2022</h2>
                    </div>
                    <div className='flex justify-center items-center h-full w-[30%] flex-col'>
                        <h1 className='text-2qxl font-bold'>$0.00</h1>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full h-[60%] gap-4'>

                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>
                            Change Amount
                        </Label>
                        <Input placeholder='$0.00' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>
                            Change Date
                        </Label>
                        <Input type='date' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>
                            Change Frequency
                        </Label>
                        <Input placeholder='Monthly' />
                    </div>
                </div>
                
                <div className='flex flex-col w-full gap-2'>
                    <Label>
                        Url
                    </Label>
                    <Input placeholder='https://www.facebook.com' />
                </div>

                <div className='flex flex-row w-full gap-2 mt-6'>
                    <Button className='w-full' variant={'secondary'}>
                        Save Changes
                    </Button>
                    <Button className='w-full' variant={'destructive'}>
                        Delete Subscription
                    </Button>
                </div>
                
            </div>

        </div>
    )
}
