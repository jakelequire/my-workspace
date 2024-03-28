'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCodeSpaceContext } from '../CodeSpaceContext';

export default function SetRepo(): JSX.Element {

    return (
        <Select>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a repository' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Repositories</SelectLabel>
                    <SelectItem value='all'>All</SelectItem>
                    <SelectItem value='banana'>my-workspace</SelectItem>
                    <SelectItem value='blueberry'>portfolio</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
