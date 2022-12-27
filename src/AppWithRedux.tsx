import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from './state/store';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>((state)=> state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>((state)=> state.tasks)

    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const onChangeTodoTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let tasksForFilter = tasks
                        let allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks

                        if (todolist.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={todolist.id}
                                              todolistId={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodolist}
                                              onChangeTaskTitle={changeTaskTitle}
                                              onChangeTodoTitle={onChangeTodoTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
