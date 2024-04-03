'use client';
import { useJobTrackerContext } from '../jobTrackerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '../datatable/datatable';

export default function JobsDisplay(): JSX.Element {
    const { jobItem } = useJobTrackerContext();


    /*
    NOTE: 
        Might need to look into this. At home, this is displaying fine but on the work PC
        it's not displaying anything. (on the live site)

        Clearing cache / clearing local DB / and logging out isn't helping resolve it.
        This file contains what datatable is being displayed. Not sure if the issue is 
        here or the datatable component itself.
    */
    const savedJobs = jobItem.filter((job) => job.status === 'Saved');
    const appliedJobs = jobItem.filter((job) => job.status === 'Applied');

    return (
        <Tabs defaultValue='currentapps' className='w-[100%]'>
            <TabsList className='h-9'>
                <TabsTrigger className='text-sm w-[100%]' value='currentapps'>
                    Current Apps
                </TabsTrigger>
                <TabsTrigger className='text-sm w-[100%]' value='saved'>
                    Saved
                </TabsTrigger>
                <TabsTrigger className='text-sm w-[100%]' value='archived'>
                    Archived
                </TabsTrigger>
            </TabsList>
            <TabsContent value='currentapps'>
                <div className='w-[100%]'>
                    <DataTable jobItem={appliedJobs} />
                </div>
            </TabsContent>
            <TabsContent value='saved'>
                <div className='w-[100%]'>
                    <DataTable jobItem={savedJobs} />
                </div>
            </TabsContent>
            <TabsContent value='archived'>
                <div className='w-[100%]'>
                    <DataTable jobItem={savedJobs} />
                </div>
            </TabsContent>
        </Tabs>
    );
}
