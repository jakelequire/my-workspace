"use client"
import { useState, useEffect } from 'react';
import ToDoState from '../todoState';
import IDGenerator from '../../utils/IDGenerator';
// Styles
import style from '../../styles/list/newList.module.css';



export default function NewListItem(): JSX.Element {

    const { todoList, setTodoList } = ToDoState();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted");

        const newTask = {
            id: IDGenerator(),
            name: "",
            description: "",
            dueDate: "",
            complete: false,
            priority: 0,
        }

        setTodoList({
            ...todoList,
            tasks: [...todoList.tasks, newTask]
        })
    }

    return (
        <div className={style.new_list_tab}>
            <form className={style.new_list_form} onSubmit={handleSubmit(e)}>
                <input className={style.new_list_input} type="text" placeholder="Task Name" />

                <button className={style.new_list_button} type="submit"></button>
            </form>
        </div>
    )
}
