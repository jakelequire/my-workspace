// calendarInterface.tsx
import Calendar from "./src/calendar";
import Sidebar from "./src/sidebar";
import TopBar from "./src/topbar";
import MonthBar from "./src/monthbar";
import style from "./calendarInterface.module.css";


export default function CalendarInterface(): JSX.Element {
  return (
    <div className={style.calendar_container}>
      <MonthBar />
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
