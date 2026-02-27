import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Clients from './pages/Clients'
import { useAuth } from './auth/AuthProvider'
import type { JSX } from 'react'
import Navbar from './components/Navbar'


function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

function Home() {
  const { user } = useAuth()

  return (
    <div className="card">
      <h1>Bem-vindo{user ? `, ${user.name}` : ''}!</h1>
      <p className="read-the-docs">Selecione uma opção no menu acima.</p>
    </div>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/clients/*" element={<RequireAuth><Clients /></RequireAuth>} />
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
    </Routes>
  )
}
