'use client';


type Props = {
    children: React.ReactNode
}

export default function PrimaryContent({ children }: Props): JSX.Element {



    return (
        <div className='flex h-full w-full border'>
            <div className='__container flex h-full w-full'>
                {children}
            </div>
        </div>
    )
}

