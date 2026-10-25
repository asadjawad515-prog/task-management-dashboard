
import { useTasks } from './TasksContext'

function Analytics() {
  const { tasks } = useTasks()

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in progress'
  ).length

  const todoTasks = tasks.filter(
    (task) => task.status === 'todo'
  ).length
  const completionRate =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100)

const highPriorityTasks = tasks.filter(
  (task) => task.priority === 'high'
).length

const mediumPriorityTasks = tasks.filter(
  (task) => task.priority === 'medium'
).length

const lowPriorityTasks = tasks.filter(
  (task) => task.priority === 'low'
).length

  return (
    <section style={{ padding: '24px', color: '#1f2937' }}>
      <h2>Task Analytics</h2>
      <p>Overview of your task progress.</p>
      <div className="analytics-summary">
  <div className="stat-card">
    <h3>Completion Rate</h3>
    <p>{completionRate}%</p>
  </div>

  <div className="stat-card">
    <h3>High Priority</h3>
    <p>{highPriorityTasks}</p>
  </div>

  <div className="stat-card">
    <h3>Medium Priority</h3>
    <p>{mediumPriorityTasks}</p>
  </div>

  <div className="stat-card">
    <h3>Low Priority</h3>
    <p>{lowPriorityTasks}</p>
  </div>
</div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>

        <div className="stat-card">
          <h3>To Do</h3>
          <p>{todoTasks}</p>
        </div>
      </div>
    </section>
  )
}

export default Analytics
