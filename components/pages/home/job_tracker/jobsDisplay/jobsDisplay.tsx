'use client';
import { useJobTrackerContext } from '../jobTrackerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function JobsDisplay(): JSX.Element {
    const { currentTab, setCurrentTab } = useJobTrackerContext();

    return (
        <Tabs defaultValue='currentapps' className='w-[400px]'>
            <TabsList>
                <TabsTrigger value='currentapps'>Current Apps</TabsTrigger>
                <TabsTrigger value='saved'>Saved</TabsTrigger>
            </TabsList>
            <TabsContent
                value='currentapps'
                onClick={() => {
                    setCurrentTab('currentapps');
                }}>
                <h1>Current Apps</h1>
            </TabsContent>
            <TabsContent
                value='saved'
                onClick={() => {
                    setCurrentTab('saved');
                }}>
                <h1>Saved</h1>
            </TabsContent>
        </Tabs>
    );
}
