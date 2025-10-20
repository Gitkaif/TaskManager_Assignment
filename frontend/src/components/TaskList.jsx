import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onUpdate, onDelete, overdueIds }) {
  if (!tasks.length) return <p className="text-gray-500">No tasks yet.</p>
  return (
    <div className="grid gap-3">
      {tasks.map((t)=> (
        <TaskItem key={t._id} task={t} onUpdate={onUpdate} onDelete={onDelete} overdue={overdueIds.has(t._id)} />
      ))}
    </div>
  )
}
