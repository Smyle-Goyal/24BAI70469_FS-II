import DashboardView from '../components/Dashboard.jsx'

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
    <DashboardView
      studentName={studentName}
      tasks={tasks}
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      pendingTasks={pendingTasks}
      onToggleTask={onToggleTask}
      onEditTask={onEditTask}
      onDeleteTask={onDeleteTask}
    />
  )
}
