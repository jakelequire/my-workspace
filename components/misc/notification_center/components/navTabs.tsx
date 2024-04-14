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

export default function NavTabs(): JSX.Element {
    const { emailNotification } = useNotificaionsContext();


    return (
        <Tabs defaultValue="account" className="flex h-full w-[450px]">

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
                    <DataTable data={emailNotification} />
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

