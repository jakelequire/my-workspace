import { useCodeSpaceContext } from '../../CodeSpaceContext';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

import { CarouselApi } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';



export default function Commits(): JSX.Element {
    const { recentBuild } = useCodeSpaceContext();



    return (
        <div className='flex justify-between flex-col h-full w-full border rounded-lg py-4 px-6 gap-2'>
            <div className='flex w-full justify-between align-middle gap-2'>
                <h1 className='text-lg font-semibold underline underline-offset-4'>
                    Commits / PRs
                </h1>
                {/*  */}
            </div>
            <div className='flex flex-col'>
                <Carousel className='w-full max-w-xs h-full'>
                    <CarouselContent className='w-full max-w-xs h-full'>



                    </CarouselContent>
                    <div className='flex items-center justify-end w-full h-full'>
                        <CarouselPrevious variant={'outline'} className={'h-7 w-7 left-0 top-[235px]'} />
                        <CarouselNext variant={'outline'} className={'h-7 w-7 right-0 top-[235px]'} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
