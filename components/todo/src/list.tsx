
import style from "../styles/list.module.css";


export default function List(): JSX.Element {
  return (
    <div className={style.list_container}>
      <a className={style.new_list_button}>New List +</a>
      <ol className={style.list}>
        <li className={style.list_item}>
          <a className={style.list_item_link}>List 1</a>
        </li>
        <li className={style.list_item}>
          <a className={style.list_item_link}>List 2</a>
        </li>
        <li className={style.list_item}>
          <a className={style.list_item_link}>List 3</a>
        </li>
      </ol>
    </div>
  );
}
