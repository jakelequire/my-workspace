'use client';
import localForage from '@/localForageConfig';

type Props = {
    className: any
}

export default function ClearLocalData({ className }: Props): JSX.Element {
    const clearLocalForage = () => {
        // remove the item from localForage
        const clearLocal = async () => {
            await localForage.clear()
        }
        clearLocal();
    }

    return (
        <a className={`h-full w-full ${className}`} onClick={clearLocalForage}>
            Clear Local
        </a>
    )
}
