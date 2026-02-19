import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import { useAuth } from './auth/AuthProvider'

function Home() {
  const { user, logout } = useAuth()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Bem-vindo{user ? `, ${user.name}` : ''}!</p>
        <div style={{display: 'flex', gap: 8, justifyContent: 'center'}}>
          <button onClick={() => logout()}>Logout</button>
          <Link to="/login"><button className="secondary">Login</button></Link>
        </div>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
    </Routes>
  )
}
