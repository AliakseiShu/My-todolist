import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    onChange: (newValue: string) => void
    value: string
}

export const EditableSpan: FC<EditableSpanType> = React.memo(({value, onChange}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);


    const activateViewEditMode = () => {
        setEditMode(false)
        onChange(title)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?
        <TextField variant="outlined"
                   value={title}
                   onChange={onChangeTitle}
                   onBlur={activateViewEditMode}
                   autoFocus/>
        // <input value={title}
        //          onChange={onChangeTitle}
        //          onBlur={activateViewEditMode}
        //          autoFocus/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
});


