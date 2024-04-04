'use client';
import { useGlobalContext } from '@/components/GlobalContext';
import { ResponsiveTimeRange } from '@nivo/calendar';
import { CodeIcon } from '@radix-ui/react-icons';

export default function CommitsCalendar(): JSX.Element {
    const { commitData } = useGlobalContext();

    const data = commitData.filter((commit) => commit.value !== 0);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 2, 0);

    // Function to format dates to MM/DD/YYYY
    const formatDate = (date: any) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const formattedStartOfMonth = formatDate(startOfMonth);
    const formattedEndOfMonth = formatDate(endOfMonth);
    return (
        <div className='flex justify-center flex-col w-full h-full'>
            <div className='flex items-center justify-start w-full pl-8 pt-4'>
                <h1 className='text-base font-bold'>Commits</h1>
                <CodeIcon className='w-6 h-6 ml-4' />
            </div>
            <div  className='flex-grow flex items-center justify-center'>
                <ResponsiveTimeRange
                    data={data}
                    from={formattedStartOfMonth}
                    to={formattedEndOfMonth}
                    emptyColor='#1b1b1b'
                    colors={['#006400', '#268a26', '#4cb14c', '#72d872', '#99ff99']}
                    minValue={1}
                    maxValue={7}
                    margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                    daySpacing={4}
                    dayBorderWidth={4}
                    direction='horizontal'
                    dayBorderColor='none'
                    align='right'
                    theme={{
                        labels: { text: { fill: 'none' } },
                        text: { fontSize: 8, fill: '#fff' },
                        tooltip: { container: { background: '#333' } },
                    }}
                />
            </div>
        </div>
    );
}
