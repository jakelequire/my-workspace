'use client';
import MarkdownDisplay from "../../utils/markdownDisplay";

type Props = {
    children: React.ReactNode
}

export default function PrimaryContent({ children }: Props): JSX.Element {



    return (
        <div className='flex h-full w-full justify-center border'>
            <div className='__container flex h-full w-[90%] py-6'>
                {/* <MarkdownDisplay markdown={''} /> */}
                {children}
            </div>
        </div>
    )
}

