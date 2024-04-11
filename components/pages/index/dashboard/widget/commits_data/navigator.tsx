'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from 'react'
import CommitsLineGraph from './linegraph/commitsLineGraph';

type TimeRangeProps = 'ONE_MONTH' | 'TWO_MONTHS'| 'THREE_MONTHS' | 'SIX_MONTHS' | 'ONE_YEAR';

type Props = {
    timeRange: TimeRangeProps;
}

export default function Navigator( { timeRange }: Props ): JSX.Element {
    console.log("[Navigator] {PROPS} timeRange: ", timeRange)
    const carouselItem = [
        {
            id: 'linegraph',
            content: <CommitsLineGraph timeRange={timeRange} />,
        },
        {
            id: 'bargraph',
            content: <div>Bar Graph</div>,
        }
    ]

    return (
        <div className='flex justify-start flex-col h-full w-full'>
            <Carousel className='flex justify-between align-middle w-full h-full flex-col'>

                <div className='flex justify-center w-full h-[90%]'>
                    <CarouselContent className='flex w-full h-full'>
                        {Array.from(carouselItem).map((id, index) => (
                            <CarouselItem key={index} className='w-full h-full flex items-center justify-center'>
                                <div className='flex items-center justify-center w-full h-full'>
                                    <Card className='flex items-center justify-center w-[100%] h-full border-none'>
                                        <CardContent className='flex w-full h-full items-center justify-center p-6'>
                                            {id.content}
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>

                <div className='flex w-full h-[10%]'>
                    <div className='flex justify-center content-center h-full w-full relative'>
                        <CarouselPrevious
                            variant={'ghost'}
                            className={'flex absolute h-8 w-8 left-8'}
                        />
                    </div>
                    <div className='flex h-full w-full relative'>
                        <CarouselNext
                            variant={'ghost'}
                            className={'flex absolute h-8 w-8 right-2'}
                        />
                    </div>
                </div>

            </Carousel>
        </div>
    );
}
