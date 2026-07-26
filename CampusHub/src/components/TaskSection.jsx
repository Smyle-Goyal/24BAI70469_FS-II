import TaskList from './TaskList.jsx'

export default function TaskSection({
  title,
  studentName,
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  showControls = true,
  limit,
}) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Tasks</p>
          <h2>{title}</h2>
        </div>
        <p className="muted">Hello, {studentName}</p>
      </div>

      <TaskList
        tasks={tasks}
        studentName={studentName}
        onToggleTask={onToggleTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        showControls={showControls}
        limit={limit}
      />
    </section>
  )
}
