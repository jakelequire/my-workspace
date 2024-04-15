'use client';
import { 
    ReaderIcon,
    BackpackIcon
} from '@radix-ui/react-icons';


export default function QuickAccess(): JSX.Element {
    const applications = [
        {
            name: "Todo",
            image: ReaderIcon,
        },
        {
            name: "Emails",
            image: ReaderIcon,
        },
        {
            name: "Jobs",
            image: BackpackIcon,
        }
    ]

    const Application = applications.map((item, index) => {
        return (
            <div key={index} className='border'>
                {item.image}
                <p>{item.name}</p>
            </div>
        )
    })


    return (
        <div className='flex justify-center flex-col h-full w-full'>
            <div className='grid h-full w-full grid-cols-3 grid-rows-2 gap-4'>
                <Application />
            </div>
        </div>
    )
}
