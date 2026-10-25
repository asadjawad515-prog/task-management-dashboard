
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Task } from './types/task'

type TasksContextType = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

type TasksProviderProps = {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks) as Task[]
      } catch {
        localStorage.removeItem('tasks')
      }
    }

    return [
  {
    id: 'task-1',
    title: 'Learn TypeScript',
    description: 'Learn TypeScript fundamentals',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-15',
    createdAt: '2026-10-08',
    updatedAt: '2026-10-08',
    assignee: 'Asad',
    tags: ['typescript', 'learning'],
    comments: [],
    subtasks: [],
  },
  {
    id: 'task-2',
    title: 'Design Dashboard UI',
    description: 'Create the dashboard layout',
    status: 'in progress',
    priority: 'medium',
    dueDate: '2026-10-20',
    createdAt: '2026-10-09',
    updatedAt: '2026-10-09',
    assignee: 'Asad',
    tags: ['design', 'dashboard'],
    comments: [],
    subtasks: [],
  },
  {
    id: 'task-3',
    title: 'Test Task Features',
    description: 'Test task management features',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-10-18',
    createdAt: '2026-10-09',
    updatedAt: '2026-10-09',
    assignee: 'Asad',
    tags: ['testing'],
    comments: [],
    subtasks: [],
  },
]
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within TasksProvider')
  }

  return context
}
