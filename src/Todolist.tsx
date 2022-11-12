import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (titleInput: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filter: FilterValuesType
}

const Todolist: FC<TodolistProps> = ({
                                         todolistId,
                                         title,
                                         tasks,
                                         removeTask,
                                         changeFilter,
                                         addTask,
                                         changeTaskStatus,
                                         filter
                                     }) => {

    let [titleInput, setTitleInput] = useState('')
    let [error, setError] = useState<string | null>('')

    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (titleInput.trim() !== '') {
            addTask(titleInput.trim())
            setTitleInput('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onAllChangeFilter = () => {
        changeFilter('all', todolistId)
    }

    const onActiveChangeFilter = () => {
        changeFilter('active', todolistId)
    }

    const onCompletedChangeFilter = () => {
        changeFilter('completed', todolistId)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleInput}
                       onChange={onchangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map((task) => {
                    const onRemoveTaskHandler = () => {
                        removeTask(task.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newIsDoneValue)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveTaskHandler}>✖</button>
                        </li>)
                })}
            </ul>
            <div>
                <button className={filter === "all" ? 'active-filter' : ''} onClick={onAllChangeFilter}>All</button>
                <button className={filter === "active" ? 'active-filter' : ''} onClick={onActiveChangeFilter}>Active</button>
                <button className={filter === "completed" ? 'active-filter' : ''} onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
