"use client"
/* ----------------------------------- */
/*            [  /index  ]             */
/*  Primary & Highest order component  */
/*             render.tsx              */
/* Primary content: <PrimaryElement /> */
/* ----------------------------------- */
import TopNavbar from "./navbar/topNavbar";
import LeftNavbar from "./navbar/leftNavbar";
import PrimaryElement from "./primaryElement";
import { PageStateProvider } from "./PageStateContext";
import { SessionProvider } from "next-auth/react";
import { CSSProperties } from "react";

export default function Render() {
  return (
    <PageStateProvider>
      <main style={_main}>
        <TopNavbar />
        <div style={_container}>
          <LeftNavbar />
          <SessionProvider>
            <PrimaryElement />
          </SessionProvider>
        </div>
      </main>
    </PageStateProvider>
  );
}
// ----------------------------------- //
//              STYLES                 //
// (making a file is overkill for now) //
// ----------------------------------- //
const _main: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  overflow: "hidden",
}

const _container: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
  overflow: "hidden",
}