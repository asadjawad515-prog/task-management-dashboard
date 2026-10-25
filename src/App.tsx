
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import AllTasks from './AllTasks'
import Analytics from './Analytics'
import Settings from './Settings'
import KanbanBoard from './components/Kanbanboard'



function App() {
    
  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <p>Manage your tasks efficiently</p>

        <nav className="header-actions" aria-label="Main navigation">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/tasks">All Tasks</NavLink>
          <NavLink to="/kanban">Kanban Board</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
<Route path="/tasks" element={<AllTasks />} />

        
        <Route path="/kanban" element={<KanbanBoard />} />


<Route path="/analytics" element={<Analytics />} />

          
<Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
