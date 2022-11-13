import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
    onChange: (newTitle: string) => void
    value: string
}

export const EditableSpan: FC<EditableSpanType> = ({value}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);


    const activateViewEditMode = () => {
        setEditMode(false)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title}
                 onChange={onChangeTitle}
                 onBlur={activateViewEditMode}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
};


