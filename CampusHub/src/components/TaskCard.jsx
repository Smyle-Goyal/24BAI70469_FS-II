export default function TaskCard({ task, studentName, onToggleTask, onEditTask, onDeleteTask }) {
  return (
    <article className={task.completed ? 'task-card completed' : 'task-card'}>
      <div className="task-card-header">
        <div>
          <p className="eyebrow">{task.priority} priority</p>
          <h3>{task.title}</h3>
        </div>
        <span className="task-badge">{task.completed ? 'Done' : 'Pending'}</span>
      </div>

      <p>{task.description}</p>
      <p className="task-meta">Deadline: {task.deadline}</p>
      <p className="task-meta">Hello, {studentName}</p>

      <div className="task-actions">
        <button type="button" className="secondary-button" onClick={() => onToggleTask(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button type="button" className="secondary-button" onClick={() => onEditTask(task)}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
