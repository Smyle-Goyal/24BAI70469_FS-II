export default function Profile({ user, taskStats, resourceCount, theme }) {
  return (
    <section className="page-stack">
      <div className="panel">
        <p className="eyebrow">Profile</p>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Theme: {theme}</p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <p className="eyebrow">Total Tasks</p>
          <h3>{taskStats.total}</h3>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Completed</p>
          <h3>{taskStats.completed}</h3>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Resources</p>
          <h3>{resourceCount}</h3>
        </article>
      </div>
    </section>
  )
}
