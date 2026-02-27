import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'


export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/clients">Clientes</NavLink>
      </div>
      <div className="navbar-right">
        {user && <span>{user.name}</span>}
        <button onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  )
}