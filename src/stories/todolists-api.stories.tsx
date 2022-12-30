import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': "928789de-36fd-420a-8028-1ba4d0547e88"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "GGG"
        todolistsApi.createTodolists(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1dece2e3-09dd-487b-a3ab-9414c935ccf6"
        todolistsApi.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "9d677037-903c-4324-bdec-675ca90fde87"
        const title = "BIG"
        todolistsApi.updateTodolists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'affa551e-1cab-46ef-9336-90b488953b16'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'affa551e-1cab-46ef-9336-90b488953b16'
        const title = 'ZINA'
        todolistsApi.createTasks(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const deleteTaskHandler = () => {
        const todolistId = 'affa551e-1cab-46ef-9336-90b488953b16'
        const id = '6e713cf1-7dc9-469b-bcb1-a053393a0388'
        todolistsApi.deleteTasks(todolistId, id)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <button onClick={deleteTaskHandler}>delete task</button>
    </div>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'affa551e-1cab-46ef-9336-90b488953b16'
        const id = "323cfcd2-54bf-4beb-bb4d-6116f4485fc2"
        const title = 'NNNNN'
        todolistsApi.updateTasks(todolistId, id, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}