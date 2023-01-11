import React, {FC, useCallback, useEffect} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from '@mui/icons-material'
import {Button, IconButton} from '@mui/material'
import {Task} from "./Task";
import { useAppDispatch } from './hooks/hooks';
import { fetchTasksTC } from './state/tasks-reducer';

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

const Todolist: FC<TodolistProps> = React.memo(({
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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolistId)
    }, [addTask])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistId)
    }, [removeTodolist, todolistId])

    const onChangeTodoTitleHandler = useCallback((newTitle: string) => {
        onChangeTodoTitle(todolistId, newTitle,)
    }, [onChangeTodoTitle, todolistId])

    const onAllChangeFilter = useCallback(() => changeFilter('all', todolistId), [changeFilter, todolistId])
    const onActiveChangeFilter = useCallback(() => changeFilter('active', todolistId), [changeFilter, todolistId])
    const onCompletedChangeFilter = useCallback(() => changeFilter('completed', todolistId), [changeFilter, todolistId])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((task) => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((task) => task.isDone)
    }

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
                {tasks.map((task) => <Task removeTask={removeTask}
                                           onChangeTaskTitle={onChangeTaskTitle}
                                           todolistId={todolistId}
                                           changeTaskStatus={changeTaskStatus}
                                           task={task}
                                           key={task.id}
                    />
                )}
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
});

export default Todolist;

