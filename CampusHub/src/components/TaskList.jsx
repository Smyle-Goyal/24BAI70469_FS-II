import { useMemo, useState } from 'react'
import TaskCard from './TaskCard.jsx'

function getDeadlineValue(task) {
  const value = new Date(task.deadline).getTime()
  return Number.isNaN(value) ? 0 : value
}

export default function TaskList({
  tasks,
  studentName,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  showControls = true,
  limit,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortDirection, setSortDirection] = useState('asc')

  const visibleTasks = useMemo(() => {
    const loweredSearch = searchTerm.toLowerCase()
    let currentTasks = [...tasks]

    if (loweredSearch) {
      currentTasks = currentTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(loweredSearch) ||
          task.description.toLowerCase().includes(loweredSearch),
      )
    }

    if (priorityFilter !== 'all') {
      currentTasks = currentTasks.filter((task) => task.priority === priorityFilter)
    }

    if (statusFilter !== 'all') {
      currentTasks = currentTasks.filter((task) =>
        statusFilter === 'completed' ? task.completed : !task.completed,
      )
    }

    currentTasks.sort((firstTask, secondTask) => {
      const comparison = getDeadlineValue(firstTask) - getDeadlineValue(secondTask)
      return sortDirection === 'asc' ? comparison : comparison * -1
    })

    if (limit) {
      return currentTasks.slice(0, limit)
    }

    return currentTasks
  }, [limit, priorityFilter, searchTerm, sortDirection, statusFilter, tasks])

  return (
    <section className="task-section">
      {showControls ? (
        <div className="controls">
          <input
            type="search"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            <option value="all">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
            <option value="asc">Deadline: Earliest first</option>
            <option value="desc">Deadline: Latest first</option>
          </select>
        </div>
      ) : null}

      <div className="task-grid">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              studentName={studentName}
              onToggleTask={onToggleTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <p className="empty-state">No tasks found.</p>
        )}
      </div>
    </section>
  )
}
