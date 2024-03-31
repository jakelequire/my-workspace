import { useCodeSpaceContext } from '../../CodeSpaceContext';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export function MiniRecentBuild() {
    const { recentBuild, refreshBuildStatus } = useCodeSpaceContext();

    const recentBuilds = recentBuild[0];

    const IconToDisplay = () => {
        if (!recentBuilds) return <CheckIcon className='text-gray-500 self-center' />;
        switch (recentBuilds.state) {
            case 'READY':
                return <CheckIcon className='text-green-500 ml-2 self-center' />;
            case 'ERROR':
                return <Cross2Icon className='text-red-500 ml-2 self-center' />;
            default:
                return <CheckIcon className='text-gray-500 ml-2 self-center' />;
        }
    };

    const BuildItem = () => {
        if (!recentBuilds) return <p>No deployments</p>;
        return (
            <>
                <p className='flex flex-col mb-8'>
                    <span className='text-xl font-semibold self-center mb-2 text-gray-400'>Project</span>
                    <span className='text-base self-center'>
                        {recentBuilds.meta.githubRepo}
                        {' '}
                        <span className='text-xs italic text-gray-400'>
                            ({recentBuilds.meta.githubRepoVisibility})
                        </span>
                    </span>
                </p>

                <div className='flex flex-row justify-center gap-6'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-base font-semibold text-gray-400'>Created</span>
                        <span className='text-sm'>{recentBuilds.created_at}</span>
                    </p>
                    <p className='flex flex-col mb-4'>
                        <span className='text-base font-semibold text-gray-400'>State</span>
                        <span className='text-sm'>{recentBuilds.state}</span>
                    </p>
                </div>

                <br />
                <div className='flex flex-row justify-center gap-2'>
                    <Button variant={'outline'}>
                        <a
                            href={recentBuilds.url}
                            target='_blank'
                            rel='noreferrer'
                            className='h-full w-full'>
                            Live Site
                        </a>
                    </Button>
                    <Button variant={'outline'}>
                        <a
                            href={recentBuilds.inspectorUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='h-full w-full'>
                            Inspect Build
                        </a>
                    </Button>
                </div>
                {/* Include Deployment URL */}
            </>
        );
    };

    const MetaData = () => {
        if (!recentBuilds) return <p>No deployments</p>;
        return (
            <div className='flex flex-col gap-6'>
                <div className='flex flex-row gap-6'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-base font-semibold text-gray-400'>Target</span>
                        <span className='text-sm'>{recentBuilds.target}</span>
                    </p>
                    <p className='flex flex-col mb-4'>
                        <span className='text-base font-semibold text-gray-400'>Building At</span>
                        <span className='text-sm'>{recentBuilds.building_at}</span>
                    </p>
                </div>
                <div className='flex flex-row gap-2'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-base font-semibold text-gray-400'>Commit Message</span>
                        <span className='text-sm'>{recentBuilds.meta.githubCommitMessage}</span>
                    </p>
                </div>
                <div className='flex self-center'>
                    <Button variant={'outline'} onClick={refreshBuildStatus}>
                        Refresh
                    </Button>
                </div>
            </div>
        );
    }


    const slideItems = [
        {0: <BuildItem />},
        {0: <MetaData />},
    ]

    return (
        <div className='flex justify-between flex-col h-full w-full border rounded-lg py-4 px-6 gap-2'>
            <div className='flex w-full justify-between align-middle gap-2'>
                <h1 className='text-lg font-semibold underline underline-offset-4'>
                    Recent Deployment
                </h1>
                <IconToDisplay />
            </div>
            <div className='flex flex-col'>
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
                        <CarouselPrevious variant={'ghost'} className={'h-7 w-7 right-2 left-0 top-[255px]'} />
                        <CarouselNext variant={'ghost'} className={'h-7 w-7 right-2 top-[255px]'} />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}
