import { useCodeSpaceContext } from '../../CodeSpaceContext';

export default function Commits(): JSX.Element {
    const { contributionCount } = useCodeSpaceContext();
    const { total, year } = contributionCount;

    const CommitsOverview = () => {
        return (
            <div className='flex justify-start flex-col w-full h-full gap-6'>
                <div className='flex flex-row justify-center text-center'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-2xl font-semibold text-gray-400 mb-2'>
                            Total Commits
                        </span>
                        <span className='text-xl font-bold'>{total}</span>
                    </p>
                </div>
                <div className='flex flex-row justify-center text-center'>
                    <p className='flex flex-col mb-4'>
                        <span className='text-2xl font-semibold text-gray-400 mb-2'>This year</span>
                        <span className='text-xl font-bold'>{year['2024']}</span>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className='flex justify-between flex-col h-full w-full border rounded-lg py-4 px-6 gap-8'>
            <div className='flex w-full justify-between align-middle gap-2'>
                <h1 className='text-lg font-semibold underline underline-offset-4'>
                    Commits / PRs
                </h1>
            </div>
            <div className='flex flex-col justify-center align-middle w-full h-full'>
                <CommitsOverview />
            </div>
        </div>
    );
}
