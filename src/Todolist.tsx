import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (titleInput: string) => void
}

const Todolist: FC<TodolistProps> = ({title, tasks, removeTask, changeFilter, addTask}) => {

    let [titleInput, setTitleInput] = useState('')

    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(titleInput)
        setTitleInput('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onAllChangeFilter = () => {
        changeFilter('all')
    }

    const onActiveChangeFilter = () => {
        changeFilter('active')
    }

    const onCompletedChangeFilter = () => {
        changeFilter('completed')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleInput}
                       onChange={onchangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((task) => {
                    const onRemoveTaskHandler = () => {removeTask(task.id)}
                    return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveTaskHandler}>✖</button>
                    </li>)})}
            </ul>
            <div>
                <button onClick={onAllChangeFilter}>All</button>
                <button onClick={onActiveChangeFilter}>Active</button>
                <button onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
