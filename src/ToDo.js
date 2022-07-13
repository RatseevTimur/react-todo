import React,{ useState } from 'react';

function ToDo({ todo, toggleTask, removeTask, editTask, edit, setValue, value, editSave }) {
    return (
        <div key={todo.id} className="item-todo">
           
            <div 
                className={todo.complete ? "item-text strike" : "item-text"}
                onClick={() => toggleTask(todo.id)}
                >
                {
                edit == todo.id ? 
                    <div >
                        <input 
                        class="edit-input" 
                        autoFocus
                        onChange={(e)=>setValue(e.target.value)} value={value}/>
                        <button onClick={editSave}>Редактировать</button>
                    </div>:
                    <div>{ todo.task }</div>
                }
            </div>
            <div className="item-delete" >
                <button class="remove" onClick={() => removeTask(todo.id)}></button>
                <button class="edit" onClick={() => editTask(todo.id)}></button>
            </div>
        </div>
    )
}

export default ToDo