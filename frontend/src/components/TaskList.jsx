import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onUpdate, onDelete, overdueIds }) {
  if (!tasks.length) return (
    <div className="card card-hover text-center">
      <p className="text-gray-600">No tasks yet.</p>
      <p className="text-sm text-gray-500">Create your first task using the form above.</p>
    </div>
  )
  return (
    <div className="grid gap-3">
      {tasks.map((t)=> (
        <TaskItem key={t._id} task={t} onUpdate={onUpdate} onDelete={onDelete} overdue={overdueIds.has(t._id)} />
      ))}
    </div>
  )
}
