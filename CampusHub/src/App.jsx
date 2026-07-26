import { useEffect, useMemo, useReducer, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Resources from './pages/Resources.jsx'
import Tasks from './pages/Tasks.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import taskReducer from './reducers/taskReducer.js'
import { initialResources, initialTasks } from './services/api.js'

const pages = {
  dashboard: 'dashboard',
  tasks: 'tasks',
  resources: 'resources',
  profile: 'profile',
}

function App() {
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage('campushub-user', null)
  const [storedTasks, setStoredTasks] = useLocalStorage('campushub-tasks', initialTasks)
  const [resources, setResources] = useLocalStorage('campushub-resources', initialResources)
  const [theme, setTheme] = useLocalStorage('campushub-theme', 'light')
  const [currentPage, setCurrentPage] = useState(storedUser ? pages.dashboard : 'login')
  const [tasks, dispatch] = useReducer(taskReducer, storedTasks)

  useEffect(() => {
    setStoredTasks(tasks)
  }, [setStoredTasks, tasks])

  useEffect(() => {
    document.documentElement.dataset.theme = theme || 'light'
  }, [theme])

  useEffect(() => {
    if (storedUser) {
      setCurrentPage((previousPage) => (previousPage === 'login' ? pages.dashboard : previousPage))
      return
    }

    setCurrentPage('login')
  }, [storedUser])

  const taskStats = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.completed).length
    return {
      total: tasks.length,
      completed: completedTasks,
      pending: tasks.length - completedTasks,
    }
  }, [tasks])

  const handleLogin = (user) => {
    setStoredUser(user)
    setCurrentPage(pages.dashboard)
  }

  const handleLogout = () => {
    removeStoredUser()
    setCurrentPage('login')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleToggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'))
  }

  const handleAddTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task })
  }

  const handleUpdateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task })
  }

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }

  const handleToggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId })
  }

  const handleAddResource = (resource) => {
    setResources((previousResources) => [...previousResources, resource])
  }

  const handleDeleteResource = (resourceId) => {
    setResources((previousResources) => previousResources.filter((resource) => resource.id !== resourceId))
  }

  if (!storedUser) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app-shell">
      <Navbar
        user={storedUser}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <div className="workspace">
        <Sidebar
          user={storedUser}
          taskStats={taskStats}
          resourceCount={resources.length}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        <main className="content">
          {currentPage === pages.dashboard ? (
            <DashboardPage
              studentName={storedUser.name}
              tasks={tasks}
              totalTasks={taskStats.total}
              completedTasks={taskStats.completed}
              pendingTasks={taskStats.pending}
              onToggleTask={handleToggleTask}
              onEditTask={() => setCurrentPage(pages.tasks)}
              onDeleteTask={handleDeleteTask}
            />
          ) : null}

          {currentPage === pages.tasks ? (
            <Tasks
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              studentName={storedUser.name}
            />
          ) : null}

          {currentPage === pages.resources ? (
            <Resources
              resources={resources}
              onAddResource={handleAddResource}
              onDeleteResource={handleDeleteResource}
            />
          ) : null}

          {currentPage === pages.profile ? (
            <Profile user={storedUser} taskStats={taskStats} resourceCount={resources.length} theme={theme} />
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default App
