// calendarInterface.tsx
import Calendar from "./src/calendar";
import Sidebar from "./src/sidebar";
import TopBar from "./src/topbar";

import style from "./calendarInterface.module.css";


export default function CalendarInterface(): JSX.Element {
  return (
    <div className={style.calendar_container}>
      <div className={style.calendar}>
        <TopBar />
        <Calendar />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
}
