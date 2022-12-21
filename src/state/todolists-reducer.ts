import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((todolist) => todolist.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            let newTodolistId = v1()
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'}
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
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId:string): RemoveTodolistActionType => ({type:'REMOVE-TODOLIST', id:todolistId})
export const AddTodolistAC = (newTitle:string): AddTodolistActionType => ({type:'ADD-TODOLIST', title:newTitle})
export const ChangeTodolistTitleAC = (todolistId: string, newTitle:string): ChangeTodolistTitleActionType =>
    ({type:'CHANGE-TODOLIST-TITLE', id:todolistId, title: newTitle})
export const ChangeTodolistFilterAC = (todolistId: string, filter:FilterValuesType): ChangeTodolistFilterActionType =>
    ({type:'CHANGE-TODOLIST-FILTER', id: todolistId, filter})