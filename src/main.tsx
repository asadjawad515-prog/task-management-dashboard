
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { TasksProvider } from './TasksContext'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
  <TasksProvider>
    <App />
  </TasksProvider>
</BrowserRouter>
  </StrictMode>,
)
