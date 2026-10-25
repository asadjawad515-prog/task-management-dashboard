
import { useState } from 'react'
import { useTasks } from './TasksContext'

function Settings() {
  const { setTasks } = useTasks()
  const [showConfirmation, setShowConfirmation] = useState(false)

  function handleResetTasks() {
    setTasks([])
    setShowConfirmation(false)
  }

  return (
    <section className="settings-page">
      <h2>Settings</h2>
      <p>Manage your task dashboard settings.</p>

      <div className="stat-card">
        <h3>Task Data</h3>
        <p>
          Remove all tasks currently saved in your dashboard.
        </p>

        {!showConfirmation ? (
          <button
            type="button"
            onClick={() => setShowConfirmation(true)}
          >
            Reset All Tasks
          </button>
        ) : (
          <div>
            <p>
              Are you sure you want to delete all tasks?
              This action cannot be undone.
            </p>

            <button
              type="button"
              onClick={handleResetTasks}
            >
              Confirm Reset
            </button>

            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Settings
