import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await signup(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card card-hover">
      <h1 className="text-xl font-semibold mb-4">Signup</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} required />
        <button className="btn w-full" disabled={loading}>{loading ? 'Loading...' : 'Create account'}</button>
      </form>
      <p className="text-sm mt-3">Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Login</Link></p>
    </div>
  )
}
