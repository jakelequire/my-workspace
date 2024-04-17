'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Subscriptions from "./components/subscriptions/subscriptions";


export default function Navigator(): JSX.Element {


    return (
        <Tabs defaultValue="subscriptions" className='flex flex-col h-full w-full'>
            <TabsList className="grid w-[20%] grid-cols-2">
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="subscriptions" className='flex h-full w-full'>
                <Subscriptions />
            </TabsContent>
            <TabsContent value="overview"></TabsContent>

        </Tabs>
    )
}
