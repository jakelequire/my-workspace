'use client';
import { 
    ReaderIcon,
    BackpackIcon
} from '@radix-ui/react-icons';
import {
    ListTodo,
    Mail,
    CalendarDays,
    Plus,
    NotebookPen
} from "lucide-react";



export default function QuickAccess(): JSX.Element {
    const applications = [
        {
            name: "Todo",
            image: ListTodo,
            href: "/home/tasks"
        },
        {
            name: "Emails",
            image: Mail,
            href: '/home/emails'
        },
        {
            name: "Jobs",
            image: BackpackIcon,
            href: '/home/jobs'
        },
        {
            name: "Calendar",
            image: CalendarDays,
            href: '/home/calendar'
        },
        {
            name: "Notes",
            image: NotebookPen,
            href: '/tools/notes'
        },
        {
            name: "Add New",
            image: Plus,
            href: ''
        }
    ]

    const Application = applications.map((item, index) => {
        return (
            <div key={index} className='flex self-center align-middle flex-col justify-center items-center w-[75%] h-[75%]rounded-md shadow-md'>
                <a 
                    href={item.href} 
                    className='transition-all hover:bg-slate-800 rounded-md p-2 h-full w-full flex flex-col justify-center items-center cursor-pointer'>
                    <item.image className='h-8 w-8' />
                    <span className='text-sm font-semibold mt-2'>{item.name}</span>
                </a>
            </div>
        )
    })


    return (
        <div className='flex justify-center flex-col h-full w-full'>
            <div className='grid justify-items-center h-full w-full grid-cols-3 grid-rows-2 gap-4 p-2'>
                {Application}
            </div>
        </div>
    )
}
