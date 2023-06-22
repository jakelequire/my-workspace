"use client";
// status.tsx
import { useState, useEffect } from "react";
import { messages } from "./messageDefs";
import useSessionState from "../useSessionState";
import { auth } from "@/lib/firebase"; // Not sure if needed

export default function Status(): JSX.Element {
  const { loggedIn } = useSessionState();

  return (
    <div style={_style}>
        {loggedIn === true
          ? <p>{messages.STATUS_LOGGED_IN}</p>
          : <p>{messages.STATUS_SIGNED_OUT}</p>
        }
    </div>
  );
}

const _style = {
  display: "flex",
  height: "100%",
  width: "100%",
};
