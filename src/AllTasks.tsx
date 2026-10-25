
import { useTasks } from './TasksContext'

function AllTasks() {
  const { tasks } = useTasks()

  return (
    <section style={{ color: '#1f2937', padding: '24px' }}>
      <h2>All Tasks</h2>

      <p>Total tasks: {tasks.length}</p>

      {tasks.length === 0 ? (
        <p>No tasks available. Add a task from the Dashboard.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <article
              key={task.id}
              style={{
                padding: '16px',
                marginBottom: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
              }}
            >
              <h3>{task.title}</h3>

              <p>{task.description || 'No description added'}</p>

              <p>Status: {task.status}</p>

              <p>Priority: {task.priority}</p>

              <p>Assignee: {task.assignee || 'Unassigned'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AllTasks
