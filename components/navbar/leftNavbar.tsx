"use client";
// leftNavbar.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePageStateContext } from "../PageStateContext";
import usePageState from "../usePageState";
import useSessionState from "../useSessionState";
// Styles
import style from "./styles/leftnavbar.module.css";
// SVGs
import _HOME from "@/public/assets/home.svg";
import _BANKING from "@/public/assets/banking.svg";
import _TODO from "@/public/assets/todo.svg";
import _STUDY from "@/public/assets/study.svg";
import _ANALYTICS from "@/public/assets/analytics.svg";
import _RESOURCES from "@/public/assets/education.svg";
import _CALENDAR from "@/public/assets/calendar.svg";

export default function LeftNavbar(): JSX.Element {
  const [requestedPage, setRequestedPage] = useState<string>("home");
  const { setPage } = usePageStateContext();
  const { user, handleSignout } = useSessionState();

  const handleClick = (page: string) => {
    setRequestedPage(page);
  };

  useEffect(() => {
    if (user) {
      setPage(requestedPage);
    }
  }, [requestedPage]);

  return (
    <nav className={style.leftNavbar}>
      <div className={style.dashboard_container}>
        <ol className={style.dashboard_items} id="items">
          {/* < ================> */}
          {/* <Home> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "home" ? "true" : "false"}
            onClick={() => {
              handleClick("home");
            }}
          >
            <Image src={_HOME} height={25} width={25} alt="home" />
            <h1 className={style.header} id="home" datatype="false">
              Home
            </h1>
          </a>
          {/* <Banking> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "banking" ? "true" : "false"}
            onClick={() => {
              handleClick("banking");
            }}
          >
            <Image src={_BANKING} height={25} width={25} alt="Banking" />
            <h1 className={style.header} id="banking" datatype="false">
              Banking
            </h1>
          </a>
          {/* <Calendar> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "calendar" ? "true" : "false"}
            onClick={() => {
              handleClick("calendar");
            }}
          >
            <Image src={_CALENDAR} height={25} width={25} alt="calendar" />
            <h1 className={style.header} id="calendar" datatype="false">
              Calendar
            </h1>
          </a>
          {/* <To-Do> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "todo" ? "true" : "false"}
            onClick={() => {
              handleClick("todo");
            }}
          >
            <Image src={_TODO} height={25} width={25} alt="To-Do" />
            <h1 className={style.header} id="todo" datatype="false">
              To-Do
            </h1>
          </a>
          {/* <Study> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "study" ? "true" : "false"}
            onClick={() => {
              handleClick("study");
            }}
          >
            <Image src={_STUDY} height={25} width={25} alt="study" />
            <h1 className={style.header} id="study" datatype="false">
              Study
            </h1>
          </a>
          {/* <Resources> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "resources" ? "true" : "false"}
            onClick={() => {
              handleClick("resources");
            }}
          >
            <Image src={_RESOURCES} height={25} width={25} alt="resources" />
            <h1 className={style.header} id="resources" datatype="false">
              Resources
            </h1>
          </a>
          {/* <Analytics> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "analytics" ? "true" : "false"}
            onClick={() => {
              handleClick("analytics");
            }}
          >
            <Image src={_ANALYTICS} height={25} width={25} alt="analytics" />
            <h1 className={style.header} id="analytics" datatype="false">
              Analytics
            </h1>
          </a>
          {/* < ================> */}
        </ol>
        <div className={style.auth_container}>
          <button className={style.auth_button} onClick={() => handleSignout()}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
