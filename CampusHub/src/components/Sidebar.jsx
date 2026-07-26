export default function Sidebar({ user, taskStats, resourceCount, currentPage, onNavigate }) {
  if (!user) {
    return null
  }

  return (
    <aside className="sidebar">
      <div className="panel">
        <p className="eyebrow">Logged in as</p>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <div className="panel">
        <p className="eyebrow">Quick Stats</p>
        <p>Total Tasks: {taskStats.total}</p>
        <p>Completed: {taskStats.completed}</p>
        <p>Pending: {taskStats.pending}</p>
        <p>Resources: {resourceCount}</p>
      </div>

      <div className="panel">
        <p className="eyebrow">Navigate</p>
        {['dashboard', 'tasks', 'resources', 'profile'].map((page) => (
          <button
            key={page}
            type="button"
            className={currentPage === page ? 'sidebar-link active' : 'sidebar-link'}
            onClick={() => onNavigate(page)}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>
    </aside>
  )
}
