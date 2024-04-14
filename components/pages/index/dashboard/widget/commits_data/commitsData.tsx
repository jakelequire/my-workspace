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
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboardContext } from '../../../DashboardContext';

type TimeRangeProps = 'ONE_MONTH' | 'TWO_MONTHS'| 'THREE_MONTHS' | 'SIX_MONTHS' | 'ONE_YEAR';

export default function CommitsData(): JSX.Element {
    const {timeRangeData, setTimeRangeData } = useDashboardContext();

    const timeValue = () => {
        switch(timeRangeData) {
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


    const setTimeRange = (value: TimeRangeProps) => {
        console.log('Hello from setCategory', value);
        setTimeRangeData(value);
    };

    const SelectTimeRange = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {timeValue()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Time Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={timeValue()} onChange={(e) => {
                        console.log('Hello from onChange');
                        setTimeRange(e as unknown as TimeRangeProps);
                    }}>
                        <DropdownMenuRadioItem
                            value='One Month'
                            onSelect={(_) => {
                                setTimeRange('ONE_MONTH');
                            }}>
                            One Month
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Two Months'
                            onSelect={(_) => {
                                setTimeRange('TWO_MONTHS');
                            }}>
                            Two Months
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Three Months'
                            onSelect={(_) => {
                                setTimeRange('THREE_MONTHS');
                            }}>
                            Three Months
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='Six Months'
                            onSelect={(_) => {
                                setTimeRange('SIX_MONTHS');
                            }}>
                            Six Months
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value='One Year'
                            onSelect={(_) => {
                                setTimeRange('ONE_YEAR');
                            }}>
                            One Year
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
    return (
        <div className='flex flex-col w-full h-full'>

            <div className='flex items-center justify-between w-full pl-8 pt-4'>
                <a href='/home/code' className='flex flex-row justify-center'>
                    <h1 className='text-xl font-bold'>Commits Data</h1>
                    <BarChartIcon className='w-5 h-5 ml-4 self-center' />
                    <div className='flex items-center w-fit h-full ml-8'>
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
                <Navigator />
            </div>
        </div>
    );
}
