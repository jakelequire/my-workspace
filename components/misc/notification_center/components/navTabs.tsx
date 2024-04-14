"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DataTable from "./datatable";
import { useNotificaionsContext } from "../NotificationsContext";
import { Notification } from "@/types/client/notificationsApp";

export default function NavTabs(): JSX.Element {
    const { emailNotification } = useNotificaionsContext();


    return (
        <Tabs defaultValue="emails" className="flex h-full w-[450px]">

            <div className='flex h-full w-[20%]'>
                <TabsList className="flex flex-col h-full w-full">
                    <TabsTrigger value="emails">Emails</TabsTrigger>
                    <TabsTrigger value="reminders">Reminders</TabsTrigger>
                    <TabsTrigger value="todo">To-do</TabsTrigger>
                    <TabsTrigger value="code">Code Alerts</TabsTrigger>
                    <TabsTrigger value="foo">foo</TabsTrigger>
                </TabsList>
            </div>

            <div className='flex h-full w-[80%]'>

                <TabsContent value="emails">
                    <DataTable data={exampleNotificationData} />
                </TabsContent>

                <TabsContent value="reminders">
                    {/* <DataTable data={Replace with other notifications} /> */}
                </TabsContent>

                <TabsContent value="todo">
                    {/* <DataTable data={Replace with other notifications} /> */}
                </TabsContent>

                <TabsContent value="code">
                    {/* <DataTable data={Replace with other notifications} /> */}
                </TabsContent>

                <TabsContent value="foo">
                    {/* <DataTable data={Replace with other notifications} /> */}
                </TabsContent>

            </div>

        </Tabs>
    )
}



const exampleNotificationData: Notification[] = [
    {
        id: '1',
        type: 'EMAIL',
        subCategory: 'NEW',
        title: 'New Email',
        body: 'You have a new email',
        date: '2022-01-01',
        read: false,
    },
    {
        id: '2',
        type: 'EMAIL',
        subCategory: 'URGENT',
        title: 'Urgent Email',
        body: 'You have an urgent email',
        date: '2022-01-02',
        read: false,
    },
    {
        id: '3',
        type: 'EMAIL',
        subCategory: 'UNREAD',
        title: 'Unread Email',
        body: 'You have an unread email',
        date: '2022-01-03',
        read: false,
    },
    {
        id: '4',
        type: 'EMAIL',
        subCategory: 'READ',
        title: 'Read Email',
        body: 'You have a read email',
        date: '2022-01-04',
        read: true,
    },
    {
        id: '5',
        type: 'TODO',
        subCategory: 'NEW',
        title: 'New Todo',
        body: 'You have a new todo',
        date: '2022-01-05',
        read: false,
    }
];