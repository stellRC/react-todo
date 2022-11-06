
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App(props) {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


// load todos, call only once at start
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // const completedTodos = [...storedTodos]
    // let newStored = [];
    // completedTodos.forEach(todo => {
    //   if (todo.complete === true) {
    //     newStored += todo;
    //   }
    // })

    // setTodos(newStored)

    console.log(storedTodos)

    // Here - access checked value so don't propogate completed values in  when reload
    // const findTodo = completedTodos
    if (storedTodos) setTodos(storedTodos)
    
  }, [])
// Local Storage useEffect hook
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
// Any time array of todos changes, you save them to local storage 
  }, [todos])

  function toggleTodo(id) {
    // always create copy; never modify state variable in react
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

function handleAddTodo(e) {
 const name =  todoNameRef.current.value
 if (name === '') return
 setTodos(prevTodos => {
  return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
 })
 todoNameRef.current.value = null
}

function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return (
  <>
    <h1>Hello, {props.name}</h1> 
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add</button>
    <button onClick={handleClearTodos}>Clear completed</button>
    <div>{todos.length} left</div>
  </>

)
}

export default App;
