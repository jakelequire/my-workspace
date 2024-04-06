'use client';
import { Input } from "@/components/ui/input"


export default function SearchBar(): JSX.Element {

    return (
        <div className='w-full px-4'>
            <Input
                type="search"
                placeholder="Search..."
                className="w-full"
            />
        </div>
    )
}

