import TaskSection from './TaskSection.jsx'

export default function Dashboard({
  studentName,
  tasks,
  totalTasks,
  completedTasks,
  pendingTasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <section className="dashboard-view">
      <div className="panel">
        <p className="eyebrow">Welcome back</p>
        <h2>{studentName}</h2>
        <p>Use CampusHub to manage tasks, store resources, and switch themes.</p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <p className="eyebrow">Total Tasks</p>
          <h3>{totalTasks}</h3>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Completed</p>
          <h3>{completedTasks}</h3>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Pending</p>
          <h3>{pendingTasks}</h3>
        </article>
      </div>

      <TaskSection
        title="Recent Tasks"
        studentName={studentName}
        tasks={tasks}
        onToggleTask={onToggleTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        showControls={false}
        limit={3}
      />
    </section>
  )
}
