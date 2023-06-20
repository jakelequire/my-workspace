"use client";
// leftNavbar.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePageStateContext } from "../PageStateContext";
// Styles
import style from "./styles/leftnavbar.module.css";
// SVGs
import _HOME from "@/public/assets/home.svg";
import _BANKING from "@/public/assets/banking.svg";
import _TODO from "@/public/assets/todo.svg";
import _ANALYTICS from "@/public/assets/analytics.svg";

export default function LeftNavbar(): JSX.Element {
  const [requestedPage, setRequestedPage] = useState<string>("home");
  const { setPage } = usePageStateContext();
  
  const handleClick = (page: string) => {
    setRequestedPage(page);
  };

  useEffect(() => {
    setPage(requestedPage);
  }, [requestedPage]);

  useEffect(() => {
    const items = document.querySelectorAll("#items a");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((item) => {
          item.setAttribute("data-active", "false");
          item.children[1].setAttribute("datatype", "false");
        });
        item.setAttribute("data-active", "true");
        item.children[1].setAttribute("datatype", "true");
      });
    });
  }, []);

  return (
    <nav className={style.leftNavbar}>
      <div className={style.dashboard_container}>
        <ol className={style.dashboard_items} id="items">
          <a
            className={style.listItem}
            data-active="true"
            onClick={() => {
              handleClick("home");
            }}
          >
            <Image src={_HOME} height={25} width={25} alt="home" />
            <h1 className={style.header} id="home" datatype="false">
              Home
            </h1>
          </a>
          <a
            className={style.listItem}
            data-active="false"
            onClick={() => {
              handleClick("banking");
            }}
          >
            <Image src={_BANKING} height={25} width={25} alt="Banking" />
            <h1 className={style.header} id="banking" datatype="false">
              Banking
            </h1>
          </a>
          <a
            className={style.listItem}
            data-active="false"
            onClick={() => {
              handleClick("todo");
            }}
          >
            <Image src={_TODO} height={25} width={25} alt="To-Do" />
            <h1 className={style.header} id="todo" datatype="false">
              To-Do
            </h1>
          </a>
          <a
            className={style.listItem}
            data-active="false"
            onClick={() => {
              handleClick("analytics");
            }}
          >
            <Image src={_ANALYTICS} height={25} width={25} alt="analytics" />
            <h1 className={style.header} id="analytics" datatype="false">
                Analytics
            </h1>
          </a>
        </ol>
      </div>
    </nav>
  );
}
