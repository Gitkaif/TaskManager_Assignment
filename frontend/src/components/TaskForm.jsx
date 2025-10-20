import { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState({ title: '', description: '', deadline: '', priority: 'Medium' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.description) {
      setError('Title and description are required')
      return
    }
    try {
      setLoading(true)
      await onCreate({ ...form, deadline: form.deadline || undefined })
      setForm({ title: '', description: '', deadline: '', priority: 'Medium' })
    } catch (err) {
      setError(err?.response?.data?.message || 'Create failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-3">
      <input className="input md:col-span-1" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
      <input className="input md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
      <input className="input md:col-span-1" type="date" value={form.deadline} onChange={(e)=>setForm({...form, deadline:e.target.value})} />
      <select className="input md:col-span-1" value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      {error && <p className="text-red-600 md:col-span-5">{error}</p>}
      <div className="md:col-span-5">
        <button className="btn" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
      </div>
    </form>
  )
}
