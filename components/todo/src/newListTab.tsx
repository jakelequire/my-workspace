"use client"
import { useState, useEffect } from 'react';

import style from '../styles/newListTab.module.css';

export default function NewListTab(): JSX.Element {

    return (
        <div className={style.new_list_tab}>
            <form className={style.new_list_form}>
                <input className={style.new_list_input} type="text" placeholder="List Name" />

                <button className={style.new_list_button} type="submit"></button>
            </form>
        </div>
    )
}
