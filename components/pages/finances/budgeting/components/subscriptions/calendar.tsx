'use client'
import { CustomCalendar } from "./customCalendar/customCalendar"


export default function CalendarPreview(): JSX.Element {


    return (
        <div className="flex h-full w-full border rounded-lg">
            <CustomCalendar
                mode="single"
                className="w-full rounded-md border shadow"
            />
        </div>
    )
}
