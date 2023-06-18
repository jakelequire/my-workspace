import ToDo from "./todo/todo";
import Image from "next/image";
import style from "../styles/widget.module.css";

import _CHECKMARK from "@/public/assets/checkmark.svg";
export default function ToDoWidget(): JSX.Element {
  return (
    <main className={style.widget}>
      <div className={style.container}>
        <div className={style.title_container} data-type="todo">
          <Image src={_CHECKMARK} height={20} width={20} alt="alt" />
          <p className={style.title}>To-Do</p>
          <div className={style.buttons_container}>
            <a className={style.button} data-type="move"></a>
            <a className={style.button} data-type="close"></a>
          </div>
        </div>

        <div className={style.center_container}>
          <ToDo />
        </div>

        <div className={style.footer_container}>
          <div className={style.footer}>
            <span className={style.btn}>
              <a className={style.footerBtn} data-type="all">
                {" "}
              </a>
            </span>
            <span className={style.btn}>
              <a className={style.footerBtn} data-type="important">
                {" "}
              </a>
            </span>
            <span className={style.btn}>
              <a className={style.footerBtn} data-type="soon">
                {" "}
              </a>
            </span>
            <span className={style.btn}>
              <a className={style.footerBtn} data-type="checkpoint">
                {" "}
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
