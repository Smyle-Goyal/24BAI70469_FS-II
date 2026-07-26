export default function Navbar({ user, theme, onToggleTheme, onLogout, currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">CampusHub</p>
        <h1 className="app-title">Student Task & Resource Manager</h1>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <nav className="nav-links" aria-label="Primary">
              {['dashboard', 'tasks', 'resources', 'profile'].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={currentPage === page ? 'nav-link active' : 'nav-link'}
                  onClick={() => onNavigate(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </nav>
            <button type="button" className="secondary-button" onClick={onToggleTheme}>
              Theme: {theme}
            </button>
            <button type="button" className="primary-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button type="button" className="secondary-button" onClick={onToggleTheme}>
            Theme: {theme}
          </button>
        )}
      </div>
    </header>
  )
}
