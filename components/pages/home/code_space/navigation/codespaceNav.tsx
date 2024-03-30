'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectRepo from './selectRepo';

import YearlyCalendar from '../widgets/yearly_calendar/yearlyCalendar';
import { MiniRecentBuild } from '../widgets/recent_builds/recentBuild';
import Commits from '../widgets/commits/commits';

export default function CodeSpaceNav(): JSX.Element {


    const OverviewContainer = () => {
        return (
            <div className='h-full w-full '>
                <div className='flex flex-col w-full h-full gap-4'>
                    <div className='flex flex-col w-full h-[50%]'>
                        <div className='flex w-full h-full border rounded-lg'>
                            <YearlyCalendar />
                        </div>
                    </div>
                    <div className='flex flex-row w-full h-[50%] gap-5'>
                        <div className='flex w-max h-full'>
                            <MiniRecentBuild />
                        </div>
                        <div className='flex min-w-[350px] w-max h-full'>
                            <Commits />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const DeploymentContainer = () => {
        return (
            <div className='h-full w-full border rounded-lg'>
                <div className='flex flex-col w-max h-max p-4'>
                    <MiniRecentBuild />
                </div>
            </div>
        )
    }


    return (
        <Tabs defaultValue='overview' className='w-[100%] h-[90%]'>
            <div className='flex justify-between items-center w-full pb-4'>
                <TabsList>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='deployments'>Deployments</TabsTrigger>
                </TabsList>
                <SelectRepo />
            </div>
            <TabsContent value='overview' className='h-full '>
                <OverviewContainer />
            </TabsContent>
            <TabsContent value='deployments' className='h-full'>
                <DeploymentContainer />
            </TabsContent>
        </Tabs>
    );
}
