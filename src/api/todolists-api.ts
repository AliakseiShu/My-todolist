import axios from "axios/index";
import * as stream from "stream";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': "928789de-36fd-420a-8028-1ba4d0547e88"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: stream
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type TasksResponse<D={}> = {
    resultCode: number
    messages: string
    data: D
}



export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<TasksResponse<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todolistId: string, id: string) {
        return instance.delete<TasksResponse>(`/todo-lists/${todolistId}/tasks/${id}`)
    },
    updateTasks(todolistId: string, id: string, title: string) {
        return instance.put<TasksResponse<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${id}`, {title:title})
    },
}