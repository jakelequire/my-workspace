import Image from "next/image";
import style from "../styles/list.module.css";

import _EDIT from "@/public/assets/edit.svg";
import _CLOSE from "@/public/assets/close-w.svg";

export default function List(): JSX.Element {
  return (
    <div className={style.list_container}>
      <a className={style.new_list_button}>New List +</a>
      <ol className={style.list}>
        <li className={style.list_item}>
          <div className={style.list_title}>
            <a className={style.list_item_edit}>
              <Image width={20} height={20} src={_EDIT} alt="edit" />
            </a>
            <a className={style.list_item_link}>List 1</a>
          </div>
          <a className={style.list_item_delete}>
            <Image width={20} height={20} src={_CLOSE} alt="delete" />
          </a>
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

// TODO:
// Need to make a generator for the list items. So far, this is the template:
// Review and finish styling
const foo = (
  // ...
  <li className={style.list_item}>
    <div className={style.list_title}>
      <a className={style.list_item_edit}>
        <Image width={20} height={20} src={_EDIT} alt="edit" />
      </a>
      <a className={style.list_item_link}> _PLACEHOLDER_VALUE_</a>
    </div>
    <a className={style.list_item_delete}>
      <Image width={20} height={20} src={_CLOSE} alt="delete" />
    </a>
  </li>
  // ...
);
