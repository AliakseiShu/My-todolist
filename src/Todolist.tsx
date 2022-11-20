import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleInput: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    onChangeTodoTitle: (newTitle: string, todolistId: string) => void
}

const Todolist: FC<TodolistProps> = ({
                                         todolistId,
                                         title,
                                         tasks,
                                         removeTask,
                                         changeFilter,
                                         changeTaskStatus,
                                         filter,
                                         removeTodolist,
                                         addTask,
                                         onChangeTaskTitle,
                                         onChangeTodoTitle
                                     }) => {
    const addTaskHandler = (titleInput: string) => {
        addTask(titleInput, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const onChangeTodoTitleHandler = (newTitle: string) => {
        onChangeTodoTitle(newTitle, todolistId)
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
            <h3>
                <EditableSpan value={title} onChange={onChangeTodoTitleHandler}/>
                <button onClick={removeTodolistHandler}>✖</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks.map((task) => {
                    const onRemoveTaskHandler = () => {
                        removeTask(task.id, todolistId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newIsDoneValue, todolistId)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        onChangeTaskTitle(task.id, newTitle, todolistId)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveTaskHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === "all" ? 'active-filter' : ''} onClick={onAllChangeFilter}>All</button>
                <button className={filter === "active" ? 'active-filter' : ''} onClick={onActiveChangeFilter}>Active
                </button>
                <button className={filter === "completed" ? 'active-filter' : ''}
                        onClick={onCompletedChangeFilter}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
