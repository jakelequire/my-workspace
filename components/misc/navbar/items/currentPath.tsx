'use client';
import { usePathname } from 'next/navigation'

export default function CurrentPath(): JSX.Element {
    const pathname = usePathname()

    const isHome = pathname === '/' ? '/index' : pathname
    const _pathname = pathname ? pathname : '/'
    const setHref = pathname === '/' ? '/' : _pathname

    return (
        <div className='flex justify-start items-center h-full w-full px-8'>
            <a href={setHref} className='text-sm font-mono font-bold tracking-widest text-gray-400'>
                {isHome}
            </a>
        </div>
    )
}
