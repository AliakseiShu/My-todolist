import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "Books", filter: 'all'},
        {id: todolistID2, title: "Tasks", filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter((task) => (task.id !== id))
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find((todoloist) => todoloist.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}

        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]

        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find((task) => task.id === taskId)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find((task) => task.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    const onChangeTodoTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find((todolist) => todolist.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
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
                <Grid container style={{padding:'20px'}}>
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

export default App;
