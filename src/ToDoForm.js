import React,{ useState } from 'react';

function ToDoForm({ addTask }) {
    const [userInput, setUserInput] = useState('')

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput("")
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                class="add-input"
                value={userInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите текст"
            />        
            <button class="add">Добавить <b>+</b><div class="d24"></div></button>
        </form>
    )
}

export default ToDoForm