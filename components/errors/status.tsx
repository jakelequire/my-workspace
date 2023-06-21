"use client"
import { useState, useEffect } from 'react'
import { messages } from "./messageDefs"
import useSessionState from "../useSessionState"
import { auth } from "@/lib/firebase" // Not sure if needed

export default function Status(): JSX.Element {
    const { loggedIn } = useSessionState();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        if(loggedIn) {
            setIsLoggedIn(true)
        }
    })

    return (
        <div style={_style}>
            {isLoggedIn === true ? messages.STATUS_LOGGED_IN : messages.STATUS_SIGNED_OUT}
        </div>
    )
}


const _style = {
    display: "flex",
    height: "100%",
    width: "100%",
}