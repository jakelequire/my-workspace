'use client';
import { useCodeSpaceContext } from '../CodeSpaceContext';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function MiniDeployment(): JSX.Element {
    const { deploymentData } = useCodeSpaceContext();

    const mostRecentDeployment = deploymentData[0];

    const IconToDisplay = () => {
        if(!mostRecentDeployment) return <CheckIcon className='text-gray-500 self-center' />;
        switch (mostRecentDeployment.state) {
            case 'success':
                return <CheckIcon className='text-green-500 self-center' />;
            case 'failure':
                return <Cross2Icon className='text-red-500 self-center' />;
            case 'pending':
                return <CheckIcon className='text-yellow-500 self-center' />;
            default:
                return <CheckIcon className='text-gray-500 self-center' />;
        }
    };

    const DeploymentItem = () => {
        if (!mostRecentDeployment) return <p>No deployments</p>;
        return (
            <>
                <p>
                    <span className='font-medium'>ID: </span>
                    <span className='text-sm text-neutral-300'>{mostRecentDeployment.id}</span>
                </p>
                <p>
                    <span className='font-medium'>Status: </span>
                    <span className='text-sm text-neutral-300'>{mostRecentDeployment.state}</span>
                </p>
                <p>
                    <span className='font-medium'>Environment: </span>
                    <span className='text-sm text-neutral-300'>{mostRecentDeployment.environment}</span>
                </p>
                <p>
                    <span className='font-medium'>Created At: </span>
                    <span className='text-sm text-neutral-300'>{mostRecentDeployment.created_at}</span>
                </p>
                {/* Include Deployment URL */}
            </>
        );
    };

    return (
        <div className='h-full w-full border rounded-lg py-4 px-6'>
            <div className='flex w-full justify-between align-middle'>
                <h1 className='text-lg font-semibold'>Recent Deployment</h1>
                <IconToDisplay />
            </div>
            <div className='flex flex-col p-2'>
                <DeploymentItem />
            </div>
        </div>
    );
}
