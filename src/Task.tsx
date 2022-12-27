import React, {ChangeEvent, FC, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task: FC<TaskPropsType> = React.memo(({removeTask, changeTaskStatus, onChangeTaskTitle, task, todolistId}) => {
    const onRemoveTaskHandler = useCallback(() => {
        removeTask(task.id, todolistId)
    },[removeTask, task.id, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todolistId)
    },[changeTaskStatus, todolistId])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        onChangeTaskTitle(task.id, newTitle, todolistId)
    },[task.id, onChangeTaskTitle, todolistId])
    return (
        <div key={task.id} className={task.isDone ? "is-done" : ''}>
            <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
            <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})