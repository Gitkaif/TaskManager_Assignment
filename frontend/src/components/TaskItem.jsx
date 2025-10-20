import { useState } from 'react'

export default function TaskItem({ task, onUpdate, onDelete, overdue }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ title: task.title, description: task.description, deadline: task.deadline ? task.deadline.substring(0,10) : '', status: task.status, priority: task.priority })
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    await onUpdate(task._id, { ...form, deadline: form.deadline || undefined })
    setLoading(false)
    setEditing(false)
  }

  return (
    <div className={`card card-hover ${overdue ? 'border border-red-400' : ''}`}>
      {editing ? (
        <div className="grid md:grid-cols-5 gap-3">
          <input className="input" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
          <input className="input md:col-span-2" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
          <input className="input" type="date" value={form.deadline} onChange={(e)=>setForm({...form, deadline:e.target.value})} />
          <select className="input" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})}>
            <option>Incomplete</option>
            <option>Completed</option>
          </select>
          <select className="input" value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <div className="flex gap-2 md:col-span-5">
            <button className="btn" onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button className="btn-secondary" onClick={()=>setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="text-xs mt-2 flex flex-wrap gap-2 items-center">
              <span className={`badge ${task.status === 'Completed' ? 'badge-success' : 'badge-neutral'}`}>{task.status}</span>
              <span className={`badge ${task.priority === 'High' ? 'badge-danger' : task.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}`}>{task.priority} priority</span>
              {task.deadline && (
                <span className="badge badge-info">Due {new Date(task.deadline).toLocaleDateString()}</span>
              )}
              {overdue && <span className="badge badge-danger">Overdue</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={()=>setEditing(true)}>Edit</button>
            <button className="btn-danger" onClick={()=>onDelete(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}
