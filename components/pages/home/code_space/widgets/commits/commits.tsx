import { useCodeSpaceContext } from '../../CodeSpaceContext';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export default function Commits(): JSX.Element {
    const { contributionCount } = useCodeSpaceContext();
    const { total, year } = contributionCount;

    const CommitsOverview = () => {
        return (
            <div className='flex justify-start flex-col w-full h-full gap-6'>
                <div className='flex flex-row justify-center text-center'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-2xl font-semibold text-gray-400 mb-2'>This year</span>
                        <span className='text-xl font-bold'>{year['2024']}</span>
                    </p>
                </div>
                <div className='flex flex-row justify-center text-center'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-2xl font-semibold text-gray-400 mb-2'>
                            Total Commits
                        </span>
                        <span className='text-xl font-bold'>{total}</span>
                    </p>
                </div>
            </div>
        );
    };

    const slideItems = [{ 0: <CommitsOverview /> }, { 0: <></> }];

    return (
        <div className='flex flex-col h-full w-full border rounded-lg py-4 px-6 gap-2'>
            <div className='flex w-full justify-between align-middle gap-2'>
                <h1 className='text-lg font-semibold underline underline-offset-4'>
                    Commits / PRs
                </h1>
            </div>
            <div className='flex flex-col justify-start'>
                <Carousel className='w-full max-w-xs h-full ml-2'>
                    <CarouselContent className='w-full max-w-xs h-full'>
                        {slideItems.map((item, index) => (
                            <CarouselItem key={index} className='w-full h-full'>
                                <Card className='w-full h-full border-none'>
                                    <CardContent className='w-full h-full p-6 gap-12'>
                                        {item[0]}
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className='flex items-center justify-center w-full h-full'>
                        <CarouselPrevious
                            variant={'ghost'}
                            className={'h-7 w-7 right-2 left-0 top-[255px]'}
                        />
                        <CarouselNext variant={'ghost'} className={'h-7 w-7 right-2 top-[255px]'} />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}
