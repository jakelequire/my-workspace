import Image from "next/image";
import { useState, useEffect } from "react";
import { useStudyStateContext } from "../StudyStateContext";
// Styles
import style from "../styles/studynav.module.css";
import _OVERVIEW from "@/public/assets/overview.svg";

export default function StudyNavbar(): JSX.Element {
  const [requestedPage, setRequestedPage] = useState<string>("home");
  const { setPage } = useStudyStateContext();

  const handleClick = (page: string) => {
    setRequestedPage(page);
  };

  useEffect(() => {
    setPage(requestedPage);
  }, [requestedPage]);

  return (
    <nav className={style.navbar_container}>
      <div className={style.navbar}>
        <ol className={style.navbar_list}>
          {/* < ===============> */}
          {/* <Overview> */}
          <a
            className={style.listItem}
            data-active={requestedPage === "overview" ? "true" : "false"}
            onClick={() => {
              handleClick("overview");
            }}
          >
            <h1 className={style.header} id="overview" datatype="false">
              Overview
            </h1>
            <Image src={_OVERVIEW} height={25} width={25} alt="overview" />
          </a>

          {/* <=============== > */}
        </ol>
      </div>
    </nav>
  );
}
