# Task Management Dashboard

A responsive task management application built with **React, TypeScript, and Vite**. Organize tasks, monitor progress, and manage your workflow through a clean dashboard, task lists, and a drag-and-drop Kanban board.

## 🚀 Live Demo

**Live Website:** https://task-management-dashboard-one-tau.vercel.app/

**GitHub Repository:** https://github.com/asadjawad515-prog/task-management-dashboard

## 📸 Screenshots

<!-<img width="805" height="358" alt="Screenshot 2026-10-25 120432" src="https://github.com/user-attachments/assets/94e8d2a0-ce08-4978-b0b2-1afc0eb7c72a" />
- Add actual project screenshots here after capturing them. -->

### Dashboard
<!-- Replace with the dashboard screenshot path. -->

### All Tasks
<img width="821" height="417" alt="image" src="https://github.com/user-attachments/assets/9bf85c83-8036-49c0-94c4-f38b782b1de7" />
<!-- Replace with the All Tasks screenshot path. -->

### Kanban Board
<img width="827" height="404" alt="image" src="https://github.com/user-attachments/assets/bc122f29-eae9-4d58-806e-1685778625c6" />
<!-- Replace with the Kanban Board screenshot path. -->

### Analytics
<!-- Replace with the Analytics screenshot path. -->

### Settings
<!-- Replace with the Settings screenshot path. -->

## ✨ Features

- Create and manage tasks
- Update task status and priority
- Search, filter, and sort tasks
- Organize tasks using a Kanban board
- Drag and drop tasks between status columns
- Track task statistics and completion progress
- Manage due dates, assignees, and tags
- Add comments and subtasks
- Save task data using browser localStorage
- Responsive layout for desktop and mobile screens
- Reset all tasks with a confirmation step

## 🛠️ Tech Stack

- **React** — Component-based user interface
- **TypeScript** — Type-safe application code
- **Vite** — Development server and production build
- **React Router** — Client-side page navigation
- **dnd-kit** — Drag-and-drop interactions
- **CSS** — Styling and responsive layouts
- **localStorage** — Browser-based task persistence

## 🧠 React Concepts Used

- Functional components
- JSX and component composition
- React Hooks, including `useState` and `useEffect` where implemented
- Context API for shared task state
- Props and event handling
- Conditional rendering
- List rendering
- Client-side routing
- TypeScript interfaces and types
- Browser localStorage
- Drag-and-drop event handling

## 🧩 Main Components

| Component | Responsibility |
|---|---|
| `App.tsx` | Main application and route setup |
| `Dashboard.tsx` | Dashboard overview |
| `AllTasks.tsx` | Task list and task management |
| `Kanbanboard.tsx` | Kanban board interface |
| `Analytics.tsx` | Task statistics and progress |
| `Settings.tsx` | Task reset and settings interface |
| `TasksContext.tsx` | Shared task state management |
| `types/task.ts` | Task-related TypeScript types |

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/asadjawad515-prog/task-management-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 💾 Data Storage

Tasks are stored in the browser's `localStorage`. Data is specific to the browser and device being used and is not automatically synchronized between devices.

## 🔮 Future Improvements

- Add secure backend storage and cross-device synchronization
- Further improve accessibility and usability
- Expand task management and reporting capabilities

## 👨‍💻 Author

**Asad Jawad**

- GitHub: https://github.com/asadjawad515-prog
- Portfolio: https://developer-portfolio-ja3ia6u51-asadjawad515-prog.vercel.app/
