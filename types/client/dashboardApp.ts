

export type TimeRangeProps = 'ONE_MONTH' | 'TWO_MONTHS'| 'THREE_MONTHS' | 'SIX_MONTHS' | 'ONE_YEAR';


export interface DashboardContextType {
    timeRangeData: TimeRangeProps;
    setTimeRangeData: (data: TimeRangeProps) => void;
}


