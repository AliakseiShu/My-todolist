import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from '@mui/icons-material'
import {Button, Checkbox, IconButton} from '@mui/material'

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
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    onChangeTodoTitle: (id: string, newTitle: string) => void
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
    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const onChangeTodoTitleHandler = (newTitle: string) => {
        onChangeTodoTitle(todolistId, newTitle,)
    }

    const onAllChangeFilter = () => changeFilter('all', todolistId)
    const onActiveChangeFilter = () => changeFilter('active', todolistId)
    const onCompletedChangeFilter = () => changeFilter('completed', todolistId)
    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodoTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>

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
                            <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveTaskHandler}>
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={filter === "all" ? "contained" : "text"}
                        onClick={onAllChangeFilter}
                        color="primary"
                >All</Button>
                <Button variant={filter === "active" ? "contained" : "text"}
                        onClick={onActiveChangeFilter}
                        color="primary"
                >Active
                </Button>
                <Button variant={filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedChangeFilter}
                        color="primary">Completed
                </Button>
            </div>
        </div>
    );
};

export default Todolist;
