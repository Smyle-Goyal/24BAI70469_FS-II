import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    const trimmedTask = task.trim()

    if (!trimmedTask) return

    setTasks([
      ...tasks,
      { id: Date.now(), text: trimmedTask, done: false },
    ])
    setTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  return (
    <main className="app">
      <div className="todo-box">
        <h1>To Do List</h1>
        <div className="input-row">
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Add a new task"
          />
          <button type="button" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {tasks.map((item) => (
            <li key={item.id} className={item.done ? 'done' : ''}>
              <span onClick={() => toggleTask(item.id)}>{item.text}</span>
              <button type="button" onClick={() => deleteTask(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App
