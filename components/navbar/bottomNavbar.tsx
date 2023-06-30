"use clients";
import { useState, useEffect } from "react";
import { usePageStateContext } from "../PageStateContext";
import useSessionState from "../useSessionState";

import styles from "./styles/bottomnavbar.module.css";

export default function BottomNavbar(): JSX.Element {
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
    <div className={styles.navbar}>
      
      <div className={styles.nav_left}>

      </div>

      <div className={styles.nav_center}>
        <div className={styles.center_items}>
          <a
            className={styles.center_link}
            data-active={requestedPage === "home" ? "true" : "false"}
            onClick={() => {
              handleClick("home");
            }}
          >
            Home
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "banking" ? "true" : "false"}
            onClick={() => {
              handleClick("banking");
            }}
          >
            Banking
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "calendar" ? "true" : "false"}
            onClick={() => {
              handleClick("calendar");
            }}
          >
            Calendar
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "todo" ? "true" : "false"}
            onClick={() => {
              handleClick("todo");
            }}
          >
            To-Do
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "study" ? "true" : "false"}
            onClick={() => {
              handleClick("study");
            }}
          >
            Study
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "resources" ? "true" : "false"}
            onClick={() => {
              handleClick("resources");
            }}
          >
            Resources
          </a>
          <a
            className={styles.center_link}
            data-active={requestedPage === "analytics" ? "true" : "false"}
            onClick={() => {
              handleClick("analytics");
            }}
          >
            Analytics
          </a>
        </div>
      </div>

      <div className={styles.nav_right}></div>
    </div>
  );
}
