import { useState } from "react"
import "./index.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()           // prevent the page from refreshing

    setTodos(currentTodos => {               //anytime you use a current value, you use a function, otherwise you can use a value like target.value by example.
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem("")  //Empty array so it can clear the case to write the item, everytime we add a new item.
  }

  function toggleTodo(id, completed) {         //I want to be able to check and delete the items.
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          todo.completed = completed
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">
            New Item
          </label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>

      </form>
      <h1 className="header"> Todo List</h1>
      <ul className="List">
        {todos.length === 0 && "Empty List"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// {todos.map}: loop through the todo and render them out. Return an array
// key={todo.id}: We put an id to todo, so React can know which 1 we want to change.
//Short Circuiting example (if no list then it write empty list, if its filled, then no message): {todos.length === 0 && "Empty List"}