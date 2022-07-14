import React from 'react';

function ToDo({ todo, toggleTask, removeTask, editTask, edit, setValue, value, editSave, setTodos }) {
    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            editSave(todo.id)
        }
    }
    return (
        <div key={todo.id} className="item-todo">
           
            <div 
                className={todo.complete ? "item-text strike" : "item-text"}
                onDoubleClick={() => toggleTask(todo.id)}
                >
                {
                edit === todo.id ? 
                    <div>
                        <input 
                        class="edit-input" 
                        autoFocus
                        onKeyDown={handleKeyPress}
                        onChange={(e)=>setValue(e.target.value)} value={value}/>
                        <button class="edit-save" onClick={()=>editSave(todo.id)}>Редактировать</button>
                    </div>:
                    <div class="unselectable">{ todo.task }</div>
                }
            </div>
            <div className="item-delete" >
                <button class="remove" onClick={() => removeTask(todo.id)}></button>
                <button class="edit" onClick={() => editTask(todo.id, todo.task)}></button>
            </div>
        </div>
    )
}

export default ToDo