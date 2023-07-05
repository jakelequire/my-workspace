"use client"
/* ----------------------------------- */
/*            [  /index  ]             */
/*  Primary & Highest order component  */
/*             render.tsx              */
/*   Main content: <PrimaryElement />  */
/* ----------------------------------- */
import TopNavbar from "./navbar/topNavbar";
import BottomNavbar from "./navbar/bottomNavbar";
import PrimaryElement from "./primaryElement";
import { PageStateProvider } from "./PageStateContext";
import { SessionProvider } from "next-auth/react";
import { CSSProperties } from "react";

export default function Render() {
  return (
    <PageStateProvider>
      <main style={_main}>
        <TopNavbar />
        <BottomNavbar />
        <div style={_container}>
          {/* <LeftNavbar /> */}
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
// ----------------------------------- //