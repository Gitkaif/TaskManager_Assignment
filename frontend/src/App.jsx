import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './router/PrivateRoute.jsx'
import { useAuth } from './state/AuthContext.jsx'

export default function App() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Task Manager</Link>
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">Hi, {user.name}</span>
                <button className="btn-secondary" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link className="btn" to="/login">Login</Link>
                <Link className="btn" to="/signup">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}
