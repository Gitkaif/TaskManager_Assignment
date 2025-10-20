import { useEffect, useMemo, useState } from 'react'
import TaskForm from '../components/TaskForm.jsx'
import TaskList from '../components/TaskList.jsx'
import Filter from '../components/Filter.jsx'
import api from '../utils/axios.js'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTasks = async (status) => {
    const query = status && status !== 'All' ? `?status=${status}` : ''
    const { data } = await api.get(`/tasks${query}`)
    setTasks(data)
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        await fetchTasks(filter !== 'All' ? filter : undefined)
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load tasks')
      } finally {
        setLoading(false)
      }
    })()
  }, [filter])

  const onCreate = async (payload) => {
    const { data } = await api.post('/tasks', payload)
    setTasks((t) => [data, ...t])
  }

  const onUpdate = async (id, payload) => {
    const { data } = await api.put(`/tasks/${id}`, payload)
    setTasks((t) => t.map((x) => (x._id === id ? data : x)))
  }

  const onDelete = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks((t) => t.filter((x) => x._id !== id))
  }

  const overdueIds = useMemo(() => new Set(
    tasks.filter(t => t.deadline && t.status === 'Incomplete' && new Date(t.deadline) < new Date()).map(t => t._id)
  ), [tasks])

  return (
    <div className="space-y-6">
      <div className="card">
        <TaskForm onCreate={onCreate} />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Tasks</h2>
        <Filter value={filter} onChange={setFilter} />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={onUpdate} onDelete={onDelete} overdueIds={overdueIds} />
      )}
    </div>
  )
}
