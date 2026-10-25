import KanbanBoard from './components/Kanbanboard'
import type { Task } from './types/task'
import { useState } from 'react'
import './App.css'
import { useTasks } from './TasksContext'
function Dashboard() {
  const { tasks, setTasks } = useTasks()
   

const [isFormOpen, setIsFormOpen] = useState(false);
const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
const displayedFirstTask = tasks[0];
const [taskTitle, setTaskTitle] = useState("");
const [taskDescription, setTaskDescription] = useState("");
const [taskDueDate, setTaskDueDate] = useState("");
const [taskAssignee, setTaskAssignee] = useState("");
const [taskTags, setTaskTags] = useState("");
const [taskComment, setTaskComment] = useState("");
const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>({});
const [formError, setFormError] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [sortBy, setSortBy] = useState("newest");
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter(
  (task) => task.status === "completed"
).length;

const inProgressTasks = tasks.filter(
  (task) => task.status === "in progress"
).length;

const todoTasks = tasks.filter(
  (task) => task.status === "todo"
).length;
const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchQuery.trim().toLowerCase());

  const matchesStatus =
    statusFilter === "all" || task.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "newest") {
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  }

  if (sortBy === "oldest") {
    return (
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
    );
  }

  if (sortBy === "title") {
    return a.title.localeCompare(b.title);
  }

  if (sortBy === "priority") {
    const priorityOrder: Record<Task["priority"], number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }

  return 0;
});
const visibleTasksCount = sortedTasks.length;

   return(
<div className="app">
    {displayedFirstTask && (
  <section className="first-task">
    <h2>{displayedFirstTask.title}</h2>
    <p>{displayedFirstTask.description}</p>
    <p>Status: {displayedFirstTask.status}</p>
    <p>Priority: {displayedFirstTask.priority}</p>
    <p>Assignee: {displayedFirstTask.assignee}</p>
  </section>
)}
<header className='dashboard-header'>
    <h1>Task Management Dashboard</h1>
    <p>Manage your tasks efficiently</p>
    <div className='header-actions'>
        <button
  type="button"
  onClick={() => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskAssignee("");
    setTaskTags("");
    setTaskComment("");
    setTaskDueDate("");
setFormError("");
    setIsFormOpen(true);
  }}
>
  Add Task
</button>
        <button>View Tasks</button>
    </div>
</header>
{isFormOpen && (
  <form
    onSubmit={(event) => {
      event.preventDefault();

      if (taskTitle.trim() === "") {
  setFormError("Task title is required.");
  return;
}

setFormError("");

      if (editingTaskId !== null) {
        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            task.id === editingTaskId
              ? {
                  ...task,
                  title: taskTitle.trim(),
description: taskDescription.trim(),
dueDate: taskDueDate,
assignee: taskAssignee.trim(),
tags: taskTags
  .split(",")
  .map((tag) => tag.trim())
  .filter((tag) => tag !== ""),
  comments: [
  ...(task.comments ?? []),
  ...(taskComment.trim()
    ? [
        {
          id: crypto.randomUUID(),
          text: taskComment.trim(),
          createdAt: new Date().toISOString(),
          author: taskAssignee.trim() || "User",
        },
      ]
    : []),
],

updatedAt: new Date().toISOString(),
                }
              : task
          )
        );
      } else {
        setTasks((previousTasks) => [
          ...previousTasks,
          {
            id: crypto.randomUUID(),
            title: taskTitle.trim(),
            description: taskDescription.trim(),
            status: "todo",
            priority: "medium",
            dueDate: taskDueDate,
            assignee: taskAssignee.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: taskTags
  .split(",")
  .map((tag) => tag.trim())
  .filter((tag) => tag !== ""),
            comments: taskComment.trim()
  ? [
      {
        id: crypto.randomUUID(),
        text: taskComment.trim(),
        createdAt: new Date().toISOString(),
        author: taskAssignee.trim() || "User",
      },
    ]
  : [],
            subtasks: [],
          },
        ]);
      }

      setTaskTitle("");
setTaskDescription("");
setTaskDueDate("");
setTaskAssignee("");
setTaskTags("");
setTaskComment("");
setEditingTaskId(null);
setFormError("");
setIsFormOpen(false);
    }}
  >
    {formError && (
  <p role="alert" className="form-error">
    {formError}
  </p>
)}
    <label htmlFor="task-title">Task Title</label>
    <input
      id="task-title"
      type="text"
      placeholder="Enter task title"
      value={taskTitle}
      onChange={(event) => {
  setTaskTitle(event.target.value);

  if (event.target.value.trim() !== "") {
    setFormError("");
  }
}}
    />

    <label htmlFor="task-description">Task Description</label>
<textarea
  id="task-description"
  placeholder="Enter task description"
  value={taskDescription}
  onChange={(event) => setTaskDescription(event.target.value)}
/>

<label htmlFor="task-due-date">Due Date</label>
<input
  id="task-due-date"
  type="date"
  value={taskDueDate}
  onChange={(event) => setTaskDueDate(event.target.value)}
/>
<label htmlFor="task-assignee">Assignee</label>
<input
  id="task-assignee"
  type="text"
  placeholder="Enter assignee name"
  value={taskAssignee}
  onChange={(event) => setTaskAssignee(event.target.value)}
/>
<label htmlFor="task-tags">Tags</label>
<input
  id="task-tags"
  type="text"
  placeholder="Enter tags separated by commas"
  value={taskTags}
  onChange={(event) => setTaskTags(event.target.value)}
/>
<label htmlFor="task-comment">Comment</label>
<textarea
  id="task-comment"
  placeholder="Write a comment"
  value={taskComment}
  onChange={(event) => setTaskComment(event.target.value)}
/>
    <button type="submit">
      {editingTaskId !== null ? "Save Changes" : "Create Task"}
    </button>

    <button
      type="button"
      onClick={() => {
  setIsFormOpen(false);
  setEditingTaskId(null);
  setTaskTitle("");
  setTaskDescription("");
  setTaskAssignee("");
  setTaskTags("");
  setTaskComment("");
  setTaskDueDate("");
  setFormError("");
}}
    >
      Cancel
    </button>
  </form>
)}
<div className='dashboard-content'>
<h2>Dashboard Overview</h2>
<p>Track your tasks and stay organized.</p>
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
        <h3>Pending</h3>
        <p>{todoTasks}</p>
    </div>
    </div>
    <KanbanBoard />
    <div className="recent-tasks">
<h2>Recent Tasks</h2>
<p>Showing {visibleTasksCount} tasks</p>
<label htmlFor="status-filter">Filter by Status</label>

<select
  id="status-filter"
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value)}
>
  <option value="all">All Tasks</option>
  <option value="todo">To Do</option>
  <option value="in progress">In Progress</option>
  <option value="completed">Completed</option>
</select>
<label htmlFor="sort-tasks">Sort Tasks</label>

<select
  id="sort-tasks"
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
  <option value="title">Title A–Z</option>
  <option value="priority">Priority: High to Low</option>
</select>

<input
  type="text"
  placeholder="Search tasks by title..."
  value={searchQuery}
  onChange={(event) => setSearchQuery(event.target.value)}
  aria-label="Search tasks by title"
/>
<button
  type="button"
  onClick={() => {
    setSearchQuery("");
    setStatusFilter("all");
  }}
>
  Clear Filters
</button>
<div className="task-list">
  {sortedTasks.length === 0 ? (
    <p>No tasks found. Try another search.</p>
  ) : (
    sortedTasks.map((task) => (
    <div className="task-item" key={task.id}>
      <h3>{task.title}</h3>
      <p>{task.description || "No description added"}</p>
       <p>Due Date: {task.dueDate || "No due date set"}</p>
       <p>Assignee: {task.assignee || "Unassigned"}</p>
        <p>
    Tags:{" "}
    {task.tags && task.tags.length > 0
      ? task.tags.join(", ")
      : "No tags added"}
  </p>
  <div className="task-subtasks">
  <h4>Subtasks</h4>
  {(() => {
  const subtasks = task.subtasks ?? [];
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const progress =
    subtasks.length === 0
      ? 0
      : Math.round((completedSubtasks / subtasks.length) * 100);

  return (
    <div className="subtask-progress">
      <div className="subtask-progress-info">
        <span>Progress</span>
        <span>
          {completedSubtasks} / {subtasks.length} completed ({progress}%)
        </span>
      </div>

      <div
        className="subtask-progress-track"
        role="progressbar"
        aria-label="Subtask completion progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="subtask-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
})()}
<div className="subtask-list">
  {(task.subtasks ?? []).map((subtask) => (
    <label key={subtask.id} className="subtask-item">
      <input
        type="checkbox"
        checked={subtask.completed}
        onChange={(event) => {
          const completed = event.target.checked;

          setTasks((previousTasks) =>
            previousTasks.map((item) =>
              item.id === task.id
                ? {
                    ...item,
                    subtasks: (item.subtasks ?? []).map((current) =>
                      current.id === subtask.id
                        ? { ...current, completed }
                        : current
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : item
            )
          );
        }}
      />

      <span
        className={subtask.completed ? "subtask-completed" : ""}
      >
        {subtask.title}
      </span>
    </label>
  ))}
</div>
  <input
    type="text"
    placeholder="Enter a subtask..."
    value={subtaskInputs[task.id] ?? ""}
    onChange={(event) =>
      setSubtaskInputs((previous) => ({
        ...previous,
        [task.id]: event.target.value,
      }))
    }
    aria-label={`New subtask for ${task.title}`}
  />

  <button
    type="button"
    onClick={() => {
      const subtaskTitle = (subtaskInputs[task.id] ?? "").trim();

      if (!subtaskTitle) return;

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                subtasks: [
                  ...(item.subtasks ?? []),
                  {
                    id: crypto.randomUUID(),
                    title: subtaskTitle,
                    completed: false,
                  },
                ],
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );

      setSubtaskInputs((previous) => ({
        ...previous,
        [task.id]: "",
      }));
    }}
  >
    Add Subtask
  </button>
</div>
  <div className="task-comments">
  <h4>Comments</h4>

  {task.comments && task.comments.length > 0 ? (
    task.comments.map((comment) => (
      <div key={comment.id} className="task-comment">
        <p>{comment.text}</p>
        <small>
          {comment.author} ·{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </small>
      </div>
    ))
  ) : (
    <p>No comments yet</p>
  )}
</div>
      <button
  type="button"
  onClick={() => {
    setEditingTaskId(task.id);
setTaskTitle(task.title);
setTaskDescription(task.description ?? "");
setTaskAssignee(task.assignee ?? "");
setTaskTags((task.tags ?? []).join(", "));
setTaskDueDate(task.dueDate ?? "");
setTaskComment("");
setFormError("");
setIsFormOpen(true);
  }}
>
  Edit
</button>
      <label htmlFor={`priority-${task.id}`}>Priority</label>

<select
  id={`priority-${task.id}`}
  value={task.priority}
  onChange={(event) => {
    const newPriority = event.target.value as Task["priority"];

    setTasks((previousTasks) =>
  previousTasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          priority: newPriority,
          updatedAt: new Date().toISOString(),
        }
      : item
  )
);
  }}
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select> 

<label htmlFor={`status-${task.id}`}>Status</label>

<select
  id={`status-${task.id}`}
  value={task.status}
  onChange={(event) => {
    const newStatus = event.target.value as Task["status"];

    setTasks((previousTasks) =>
  previousTasks.map((item) =>
    item.id === task.id
      ? {
          ...item,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
      : item
  )
);
  }}
>
  
  <option value="todo">To Do</option>
  <option value="in progress">In Progress</option>
  <option value="completed">Completed</option>
</select>
      <button
  type="button"
  onClick={() => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  setTasks((previousTasks) =>
    previousTasks.filter((item) => item.id !== task.id)
  );
}}
>
  Delete
</button>
    </div>
  ))
  )}
</div>

</div>
</div>
</div>  
    )   
}
export default Dashboard;




    
    
