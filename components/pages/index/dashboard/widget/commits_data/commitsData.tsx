'use client';
import Navigator from './navigator';
import { BarChartIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from 'react'

type TimeRangeProps = 'ONE_MONTH' | 'TWO_MONTHS'| 'THREE_MONTHS' | 'SIX_MONTHS' | 'ONE_YEAR';

export default function CommitsData(): JSX.Element {
    const [timeRange, setTimeRange] = useState<TimeRangeProps>('ONE_MONTH')

    const timeValue = () => {
        switch(timeRange) {
            case "ONE_MONTH":
                return 'One Month';
            case "TWO_MONTHS":
                return 'Two Months';
            case "THREE_MONTHS":
                return 'Three Months'
            case "SIX_MONTHS":
                return 'Six Months';
            case "ONE_YEAR":
                return 'One Year';
            default:
                // See if changing to `timeRange` is fine later.
                return 'One Month';
        }
    }

    const SelectTimeRange = () => {
        return (
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={timeValue()} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Time Range</SelectLabel>
                        <SelectItem value="One Month" onClick={() => setTimeRange("ONE_MONTH")}>
                            One Month
                        </SelectItem>
                        <SelectItem value="Two Months" onClick={() => setTimeRange("TWO_MONTHS")}>
                            Two Months
                        </SelectItem>
                        <SelectItem value="Three Months" onClick={() => setTimeRange("THREE_MONTHS")}>
                            Three Months
                        </SelectItem>
                        <SelectItem value="Six Months" onClick={() => setTimeRange("SIX_MONTHS")}>
                            Six Months
                        </SelectItem>
                        <SelectItem value="One Year" onClick={() => setTimeRange("ONE_YEAR")}>
                            One Year
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }
    return (
        <div className='flex flex-col w-full h-full'>

            <div className='flex items-center justify-between w-full pl-8 pt-4'>
                <a href='/home/code' className='flex flex-row justify-center'>
                    <h1 className='text-xl font-bold'>Commits Data</h1>
                    <BarChartIcon className='w-5 h-5 ml-4 self-center' />
                    <div className='flex items-center w-fit h-full ml-2'>
                        <SelectTimeRange />
                    </div>
                </a>
                {/* TODO:
                    Implement a dropdown menu to choose from different widgets.
                    The idea is to make the UI more dynamic.
                */}
                <a className='flex items-center self-end w-fit h-full'>
                    <HamburgerMenuIcon color={'#636363'} className='w-5 h-5 mr-4' />
                </a>
            </div>

            <div className='flex items-center justify-end w-full h-full pr-8'>
                <Navigator timeRange={timeRange} key={timeRange} />
            </div>
        </div>
    );
}
