import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function PrivateRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}
