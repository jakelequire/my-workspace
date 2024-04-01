'use client';
import localForage from '@/localForageConfig';
import { Button } from '@/components/ui/button';

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
        <Button className={`h-full w-full ${className}`} onClick={clearLocalForage}>
            Clear Local
        </Button>
    )
}
