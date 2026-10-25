
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useTasks } from '../TasksContext'
import type { Task } from '../types/task'

type TaskStatus = Task['status']

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
]

type TaskCardProps = {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    data: { status: task.status },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none' as const,
    userSelect: 'none' as const,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="kanban-card"
      {...listeners}
      {...attributes}
    >
      <h4>{task.title}</h4>
      <p>{task.description || 'No description added'}</p>
      <small>Priority: {task.priority}</small>
    </article>
  )
}

type KanbanColumnProps = {
  id: TaskStatus
  title: string
  tasks: Task[]
}

function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
      style={{
        outline: isOver ? '2px dashed #2563eb' : 'none',
        outlineOffset: '2px',
      }}
    >
      <h3>
        {title} ({tasks.length})
      </h3>

      {tasks.length === 0 ? (
        <p className="kanban-empty">Drop a task here</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  )
}

function KanbanBoard() {
  const { tasks, setTasks } = useTasks()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(KeyboardSensor),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const taskId = String(active.id)

    const newStatus = String(
      over.data.current?.status ?? over.id,
    )

    if (!columns.some((column) => column.id === newStatus)) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId && task.status !== newStatus
          ? {
              ...task,
              status: newStatus as TaskStatus,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  return (
    <section className="kanban-board">
      <h2>Kanban Board</h2>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-columns">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter(
                (task) => task.status === column.id,
              )}
            />
          ))}
        </div>
      </DndContext>
    </section>
  )
}

export default KanbanBoard
