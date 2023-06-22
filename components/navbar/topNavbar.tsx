"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import style from './styles/topnavbar.module.css'
import { usePageStateContext } from "../PageStateContext"
import useSessionState from '../useSessionState'
import Status from '../errors/status'
// SVG
import _DOCUMENTS from '@/public/assets/documents.svg'

export default function TopNavbar(): JSX.Element {
    const { page } = usePageStateContext()
    const { loggedIn } = useSessionState();

    const [currentPage, setCurrentPage] = useState<string>(page)
    const [time, setTime] = useState<string>("12:00pm")
    const [date, setDate] = useState<string>("Monday, 1st January 2021")
    
    useEffect(() => {
        const timer = setInterval(() => { // Save the interval id to clear it later
            setTime(currentTime())
            setDate(currentDate())
        }, 1000) // Update every second
    
        return () => {
            clearInterval(timer) // Clear the interval when the component unmounts
        }
    }, [])

    useEffect(() => {
        setCurrentPage(page)
    }, [page])



    return (
        <nav className={style.topNavbar}>
            <div className={style.container}>
                <ol className={style.list}>
                    <a className={style.navItem}>
                        <Image src={_DOCUMENTS} height={25} width={25} alt="docs" />
                        <p className={style.title}>Documents</p>
                    </a>
                </ol>
                <div className={style.systemMessages}>
                    <div className={style.currentDir}>    
                        <p className={style.systemMessagesText}>
                            /{currentPage}/
                        </p>
                    </div>
                    <div className={style.sysMessages}>
                        <p className={style.sysMessageText}>
                            {/* <Status /> */}
                        {/* This is broken ^ :) */}
                        </p>
                    </div>
                </div>
                <div className={style.time}>
                    <p className={style.timeText}>
                        {time}
                    </p>
                    <p className={style.timeSubtext}>
                        {date}
                    </p>
                </div>
            </div>
        </nav>
    )
}

function currentTime(): string {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    //@ts-ignore
    minutes = minutes < 10 ? "0"+minutes : minutes

    return `${hours}:${minutes}${ampm}`
}

function currentDate(): string {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero indexed, so we add 1
    let year = date.getFullYear();

    return `${month}/${day}/${year}`
}
