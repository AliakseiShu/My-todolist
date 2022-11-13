import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (titleInput: string) => void
}

export const AddItemForm: FC<AddItemFormType> = ({addItem }) => {
    let [titleInput, setTitleInput] = useState('')
    let [error, setError] = useState<string | null>('')

    const addTaskHandler = () => {
        if (titleInput.trim() !== '') {
            addItem(titleInput.trim())
            setTitleInput('')
        } else {
            setError('Title is required')
        }
    }

    const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input value={titleInput}
                   onChange={onchangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};


