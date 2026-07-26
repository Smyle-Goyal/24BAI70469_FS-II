import { useState } from 'react'
import TaskList from '../components/TaskList.jsx'

const emptyForm = {
  title: '',
  description: '',
  priority: 'Medium',
  deadline: '',
}

export default function Tasks({ tasks, onAddTask, onUpdateTask, onToggleTask, onDeleteTask, studentName }) {
  const [formData, setFormData] = useState(emptyForm)
  const [editingTaskId, setEditingTaskId] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const nextTask = {
      id: editingTaskId ?? Date.now(),
      ...formData,
      completed: editingTaskId ? tasks.find((task) => task.id === editingTaskId)?.completed ?? false : false,
    }

    if (editingTaskId) {
      onUpdateTask(nextTask)
      setEditingTaskId(null)
    } else {
      onAddTask(nextTask)
    }

    setFormData(emptyForm)
  }

  function handleEditTask(task) {
    setEditingTaskId(task.id)
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
    })
  }

  return (
    <section className="page-stack">
      <div className="panel">
        <p className="eyebrow">Task Manager</p>
        <h2>Add or edit tasks</h2>
        <form className="form grid-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Task description"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            required
          />
          <select
            value={formData.priority}
            onChange={(event) => setFormData({ ...formData, priority: event.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={formData.deadline}
            onChange={(event) => setFormData({ ...formData, deadline: event.target.value })}
            required
          />
          <button type="submit" className="primary-button">
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>

      <TaskList
        tasks={tasks}
        studentName={studentName}
        onToggleTask={onToggleTask}
        onEditTask={handleEditTask}
        onDeleteTask={onDeleteTask}
        showControls
      />
    </section>
  )
}
