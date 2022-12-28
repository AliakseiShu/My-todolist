import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'Task/Component',
    component: Task,
}

const changeTaskStatusCallback = action("Status changed")
const onChangeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task delete")

export const TaskExample = () => {
    return <>
        <Task task={{ id: '1', title: 'Good', isDone: true}}
              todolistId={'todolistId1'}
              removeTask={removeTaskCallback}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
        />
        <Task task={{ id: '2', title: 'HI', isDone: false}}
              todolistId={'todolistId2'}
              removeTask={removeTaskCallback}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
        />
    </>
}