import Image from "next/image";
import style from "../styles/halfwidget.module.css";
import Reminders from "./reminders/reminders";


export default function ReminderWidget(): JSX.Element {
  return (
    <main className={style.widget}>
      <div className={style.container}>
        <div className={style.title_container} data-type="reminders">
          {/* <Image src={_CHECKMARK} height={20} width={20} alt="alt" /> */}
          <p className={style.title}>Reminders</p>
          <div className={style.buttons_container}>
            <a className={style.button} data-type="move"></a>
            <a className={style.button} data-type="close"></a>
          </div>
        </div>

        <div className={style.center_container}>
            <Reminders />
        </div>

        <div className={style.footer_container}>
          <div className={style.footer}>

          </div>
        </div>
      </div>
    </main>
  );
}
