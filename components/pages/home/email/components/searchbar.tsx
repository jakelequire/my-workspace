'use client';
import { Input } from "@/components/ui/input"


export default function SearchBar(): JSX.Element {

    return (
        <div className='h-full w-full px-4 py-2'>
            <Input
                type="search"
                placeholder="Search..."
                className="w-full"
            />
        </div>
    )
}

