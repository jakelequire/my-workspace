import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashNav() {
    return (
        <Tabs defaultValue='account' className=' w-96'>
            <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value='overview'>

            </TabsContent>
            <TabsContent value='analytics'>

            </TabsContent>
            <TabsContent value='notifications'>

            </TabsContent>
        </Tabs>
    );
}
