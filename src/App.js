import React,{ useEffect, useState } from 'react';
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'


import {Routes, Route, Link} from 'react-router-dom'

import { Homepage } from './pages/Homepage'
import { Listpage } from './pages/Listpage'
import { Friendspage } from './pages/Friendspage'
import { Contactspage } from './pages/Contactspage'
function App() {
  const [todos, setTodos] = useState([])

  const [edit, setEdit] = useState(null)
  const [value, setValue] = useState('')

  const [filtered, setFiltered] = useState(todos)

  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        complete: false
      }
      setTodos([...todos, newItem])
    }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const editTask = (id, task) => {
    setEdit(id)
    setValue(task)
  }

  function editSave(id) {
    let editTodo = [...todos].map( todo => {
      if(todo.id === id){
        todo.task = value 
      }
      return todo
    })
    setTodos(editTodo)
    setEdit(null)
  }

  useEffect( ()=> {
    setFiltered(todos)
  },[todos])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function todoFilter (status) {
    if(status==='all'){
      setFiltered(todos)
    }
    else{
      let newTodos = [...todos].filter(todo => todo.complete === status)
      setFiltered(newTodos)
    }
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }

  return (
    <>
      <div className="App">
        
        <nav class="top-menu">
          <div class="dropdown">
            <button class="dropbtn"></button>
            <div class="dropdown-content">
            <a href="/">Главная</a>
            <a href="/list">Список</a>
            <a href="/friends">Друзья</a>
            <a href="/contacts">Контакты</a>
            <a href="#">Войти</a>
            <a href="#">Оповещения</a>
            <a href="#">Профиль</a>
            </div>
          </div>


          <a class="navbar-logo" href="">JUSTICE</a>
          <ul class="menu-main">
            <li><a class="tabs" href="/">Главная</a></li>
            <li><a class="tabs" href="/list">Список</a></li>
            <li><a class="tabs" href="/friends">Друзья</a></li>
            <li><a class="tabs" href="/contacts">Контакты</a></li>
            <li><a><button class="comein">Войти</button></a></li>
            <li><a><button class="bell"></button></a></li>
            <li><a><button class="user"></button></a></li>
          </ul>
        </nav>

        <div class="form">
          <div class="elements left-elements">
          <button class="filter"
          onClick={()=>todoFilter('all')}>Список</button>
          <button class="filter"
          onClick={()=>todoFilter(false)}>Напоминания</button>
          <button class="filter"
          onClick={()=>todoFilter(true)}>Ещё</button>
          </div>
          <div class="elements right-elements">
            <ToDoForm addTask={addTask}/>
          </div>
        </div>
        <div class="todo">
          {filtered.map((todo, setTodos) => {
            return (
              <ToDo
                todo={todo}
                key={todo.id}
                toggleTask={handleToggle}
                removeTask={removeTask}
                editTask={editTask}
                edit={edit}
                setValue={setValue}
                value={value}
                editSave={editSave}
                setTodos={setTodos}
              />
            )
          })}
        </div>
        
        <footer>
          <div class="foot-up">
            <a class="foot-logo" href="">JUSTICE</a>
            <ul class="foot-ul">
              <li><a class="tabs" href="/">Главная</a></li>
              <li><a class="tabs" href="/list">Список</a></li>
              <li><a class="tabs" href="/friends">Друзья</a></li>
              <li><a class="tabs" href="/contacts">Контакты</a></li>
            </ul>
          </div>
          <hr class="hr"></hr>
          <div class="foot-down">
            <a>© 2021 Justice-team. All rights reserved.</a>
            <ul>
              <li><a>Terms & conditions</a></li>
              <li><a>Privacy Policy</a></li>
            </ul>
          </div>
        </footer>
      </div>
      <Routes>
        <Route path="/" elements={<Homepage/>}/>
        <Route path="/list" elements={<Listpage/>}/>
        <Route path="/friends" elements={<Friendspage/>}/>
        <Route path="/contacts" elements={<Contactspage/>}/>
      </Routes>
    </>
  );
}

export default App;