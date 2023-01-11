import {TodolistType} from "../App";
import {v1} from "uuid";
import {useEffect} from "react";
import {todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistFilterActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistFilterActionType

const initialState: TodolistType[] = []
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter?: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((todolist) => todolist.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            let newTodolistId = v1()
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            const todolist = state.find((todolist) => todolist.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const todolist1 = state.find((todolist) => todolist.id === action.id)
            if (todolist1) {
                todolist1.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS" : {
            return action.todolists.map((tl) => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
})
export const addTodolistAC = (newTitle: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title: newTitle,
    todolistId: v1()
})
export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTitle})
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter})
export const setTodolistAC = (todolists: TodolistDomainType[]): SetTodolistFilterActionType =>
    ({type: 'SET-TODOLISTS', todolists: todolists})

export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistsApi.getTodolists()
            .then(res => {
                console.log(res.data)
                dispatch(setTodolistAC(res.data))
            })
    }
}

