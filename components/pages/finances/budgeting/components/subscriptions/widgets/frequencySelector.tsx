'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FrequencyType = 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'

export default function FrequencySelector(): JSX.Element {


    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>

        <SelectContent>
            <SelectGroup>
                <SelectLabel>ayment Frequency</SelectLabel>
                <SelectItem value="apple">Weekly</SelectItem>
                <SelectItem value="banana">Bi-Weekly</SelectItem>
                <SelectItem value="blueberry">Monthly</SelectItem>
                <SelectItem value="grapes">Quarterly</SelectItem>
                <SelectItem value="pineapple">Semi-Annually</SelectItem>
                <SelectItem value="pineapple">Annually</SelectItem>
            </SelectGroup>
        </SelectContent>

      </Select>
    )
}

