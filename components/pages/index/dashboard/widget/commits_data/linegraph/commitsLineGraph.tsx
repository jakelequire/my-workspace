'use client';
import { ResponsiveLine } from '@nivo/line';
import { useGlobalContext } from '@/components/GlobalContext';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { format, subMonths, isWithinInterval } from 'date-fns';
import { useDashboardContext } from '@/components/pages/index/DashboardContext';
import { TimeRangeProps } from '@/types/client/dashboardApp';

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
    const { timeRangeData } = useDashboardContext();

    const [graphData, setGraphData] = useState<Data[]>([]);

    const convertCommitHistoryToData = useCallback((commitHistory: CommitHistory[]) => {
        const id = 'commits';
        const color = 'hsl(178, 70%, 50%)';
    
        const timeValue = () => {
            switch(timeRangeData) {  // Use timeRangeData directly
                case "ONE_MONTH":
                    return 1;
                case "TWO_MONTHS":
                    return 2;
                case "THREE_MONTHS":
                    return 3;
                case "SIX_MONTHS":
                    return 6;
                case "ONE_YEAR":
                    return 12;
                default:
                    return 1;
            }
        }
    
        const endDate = new Date();
        const startDate = subMonths(endDate, timeValue());
        
        const data: Data['data'] = [];
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
    }, [timeRangeData]);  // Updated dependency array to use timeRangeData
    
    useEffect(() => {
        if (commitHistory) {
            const convertedData = convertCommitHistoryToData(commitHistory);
            setGraphData(convertedData);
        }
    }, [commitHistory, convertCommitHistoryToData]);

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
                    tickPadding: 6,
                    tickRotation: 45,
                    legend: 'Days',
                    legendOffset: 43,
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
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={3}
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
                            line: { stroke: '#777', border: '1px solid #fff' },
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
