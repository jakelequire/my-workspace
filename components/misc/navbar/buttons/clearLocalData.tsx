'use client';
import localForage from '@/localForageConfig';

export default function ClearLocalData(): JSX.Element {
    const clearLocalForage = () => {
        // remove the item from localForage
        const clearLocal = async () => {
            await localForage.setItem(
                'todoItems',
            );
            await localForage.setItem(
                'jobItems'
            )
        }
        clearLocal();
    }

    return (
        <a className='h-full w-full' onClick={clearLocalForage}>
            Clear Local
        </a>
    )
}
