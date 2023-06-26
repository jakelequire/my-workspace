"use client"

import Image from 'next/image'

import style from '../styles/newListItem.module.css'


export default function newListItem(): JSX.Element {

    return (
        <div className={style.newListItem}>
            
            <div className={style.input_container}>

            </div>
            
            <div className={style.shadow_container}>
                <div className={style.description}>
                    <textarea className={style.description_input} placeholder="Description"></textarea>
                </div>
                <div className={style.dueDate}>
                    <div className={style.dueDate_container}>
                        <input type="date" className={style.dueDate_input} />
                    </div>
                    <div className={style.calendar_container}>

                    </div>
                </div>
            </div>

            <div className={style.options_container}>
                <div className={style.priority_container}>
                    <a className={style.priority_button}>Low</a>
                    <a className={style.priority_button}>Medium</a>
                    <a className={style.priority_button}>High</a>
                </div>
            </div>
        
        </div>
    )
}