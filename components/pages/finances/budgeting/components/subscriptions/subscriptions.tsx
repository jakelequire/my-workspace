'use client';
import Totals from "./totals";
import NewItem from "./newItem";
import CurrentList from "./currentList";
import OpenedItem from "./openedItem";
import Calendar from "./calendar";

export default function Subscriptions(): JSX.Element {



    return (
        <div className='flex h-[100%] w-full'>

            <div className='flex flex-col w-[30%] h-full'>
                <div className='flex w-full h-[30%] p-4'>
                    <Totals />
                </div>
                <div className='flex w-full h-[70%] p-4'>
                    <NewItem />
                </div>
            </div>

            <div className='flex flex-row w-[70%] h-full'>
                <div className='flex w-[50%] h-full max-h-[100%] p-4'>
                    <CurrentList />
                </div>
                <div className='flex flex-col w-[50%] h-full p-4 gap-8'>
                    <div className='flex w-full h-[40%]'>
                        <Calendar />
                    </div>
                    <div className='flex w-full h-[60%]'>
                        <OpenedItem />
                    </div>
                </div>
            </div>

        </div>
    )
}

