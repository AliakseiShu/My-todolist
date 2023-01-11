import { log } from "console";
import {v1} from "uuid";
import { todolistsApi } from "../api/todolists-api";
import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";
import { AppThunk } from "./store";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistFilterActionType} from "./todolists-reducer";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistFilterActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter((task) => (task.id !== action.taskId))
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK" : {
            let task = {id: v1(), title: action.title, isDone: false}
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [task, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map((task) => task.id === action.taskId ? {
                ...task,
                isDone: action.isDone
            } : task)
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map((task) => task.id === action.taskId ? {
                ...task,
                title: action.title
            } : task)
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS" : {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId})

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType =>
    ({type: 'ADD-TASK', title: title, todolistId: todolistId})

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType =>
    ({type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId})

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType =>
    ({type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId})

export const setTaskseAC = (tasks: TaskType[], todolistId: string): SetTasksActionType =>
    ({type: 'SET-TASKS', tasks: tasks, todolistId: todolistId})


export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                const tasks = res.data.items
                dispatch(setTaskseAC(tasks, todolistId))
            })
    }
}

