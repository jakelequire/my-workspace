'use client';
import { ResponsiveLine } from '@nivo/line';
import { useGlobalContext } from '@/components/GlobalContext';
import { useState, useEffect } from 'react';
import { format, subMonths, isWithinInterval } from 'date-fns';

interface CommitHistory {
    totalContributions: number;
    weeks: {
        contributionDays: {
            contributionCount: number;
            date: string;
        }[];
        firstDay: string;
    }[];
}

interface Data {
    id: string;
    color: string;
    data: {
        x: string;
        y: number;
    }[];
}


export default function CommitsLineGraph(): JSX.Element {
    const { commitHistory } = useGlobalContext();
    const [graphData, setGraphData] = useState<Data[]>([]);

    useEffect(() => {
        if (commitHistory) {
            const convertedData = convertCommitHistoryToData(commitHistory);
            setGraphData(convertedData);
        }
    }, [commitHistory]);

    const convertCommitHistoryToData = (
        commitHistory: CommitHistory[],
        id: string = 'commits',
        color: string = 'hsl(178, 70%, 50%)'
    ): Data[] => {
        const data: Data['data'] = [];

        const endDate = new Date(); // today's date
        const startDate = subMonths(endDate, 1); // 1 months before today

        commitHistory.forEach((week) => {
            week.weeks.forEach((weekInfo) => {
                weekInfo.contributionDays.forEach((day) => {
                    const dayDate = new Date(day.date);
                    if (isWithinInterval(dayDate, { start: startDate, end: endDate })) {
                        data.push({
                            x: format(dayDate, 'yyyy-MM-dd'),
                            y: day.contributionCount,
                        });
                    }
                });
            });
        });

        return [{ id, color, data }];
    };

    return (
        <div style={{ scale: '1.1', marginLeft: '40px' }} className='flex w-full h-full'>
            <ResponsiveLine
                data={graphData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                }}
                xFormat="time:%b %d"
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=' >-.2f'
                axisTop={null}
                axisRight={null}
                colors={{ scheme: 'set2' }}
                enableGridX={false}
                enableGridY={false}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: 'Days',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    ariaHidden: true,
                    format: "%b %d",
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Commits',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                theme={{
                    labels: { text: { fill: '#999' } },
                    text: { fontSize: 12, fill: '#999' },
                    tooltip: { container: { background: '#333' } },
                    crosshair: { line: { stroke: '#fff' } },
                    axis: {
                        ticks: {
                            line: { stroke: '#777' },
                            text: { fill: '#fff', fontSize: 9 },
                        },
                    }
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.95,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, 1)',
                    },
                ]}
            />
        </div>
    );
}
