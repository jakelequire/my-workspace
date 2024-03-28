import { useCodeSpaceContext } from '../CodeSpaceContext';
import { ResponsiveCalendar } from '@nivo/calendar';

export default function YearlyCalendar(): JSX.Element {
    const { filteredCommitHistory } = useCodeSpaceContext();

    const data = filteredCommitHistory.filter(commit => commit.value !== 0)

    return (
        <ResponsiveCalendar
            data={data}
            from='1/1/2024'
            to='12/31/2024'
            emptyColor='#1b1b1b'
            colors={['#006400', '#268a26', '#4cb14c', '#72d872', '#99ff99']}
            minValue={1}
            maxValue={7}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={80}
            daySpacing={6}
            monthBorderColor='none'
            dayBorderWidth={2}
            dayBorderColor='none'
            theme={{
                labels: { text: { fill: '#fff' } },
                text: { fontSize: 12, fill: '#fff' },
                tooltip: { container: { background: '#333' } },
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left',
                    itemTextColor: '#fff',
                },
            ]}
        />
    );
}
