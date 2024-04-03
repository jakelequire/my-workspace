'use client'
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Navbar(): JSX.Element {
    return (
        <Tabs orientation={'vertical'} defaultValue='overview' className='w-full '>
                <TabsList className='grid h-[20%] w-[100%] grid-cols-1 bg-transparent'>
                    <TabsTrigger value='overview' className=''>Overview</TabsTrigger>
                    <TabsTrigger value='deployments' >Deployments</TabsTrigger>
                </TabsList>
            <TabsContent value='overview' className='h-full'>

            </TabsContent>
            <TabsContent value='deployments' className='h-full'>

            </TabsContent>
        </Tabs>
    );
}
