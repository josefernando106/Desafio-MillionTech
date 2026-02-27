import { useEffect, useState } from 'react'
import { Link, useNavigate, Routes, Route } from 'react-router-dom'
import type { Client } from '../components/Forms'
import { ClientForm } from '../components/Clients'
import { apiClient } from '../services/api'

export default function Clients() {
  return (
    <Routes>
      <Route path="/" element={<ClientsList />} />
      <Route path="new" element={<ClientForm />} />
      <Route path=":id/edit" element={<ClientForm />} />
    </Routes>
  )
}

function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchClients = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getClients()
      setClients(data)
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchClients() }, [])

  const remove = async (id: string) => {
    try {
      await apiClient.deleteClient(id)
      setClients(clients.filter((c) => c.id !== id))
    } catch (err: any) {
      setError(err?.message || 'Erro ao remover cliente')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Clientes</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>Lista de clientes cadastrados</div>
          <div>
            <Link to="new"><button>Adicionar</button></Link>
          </div>
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        {loading ? (
          <p>Carregando...</p>
        ) : clients.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Nome</th>
                <th style={{ textAlign: 'left' }}>Email</th>
                <th style={{ textAlign: 'left' }}>Telefone</th>
                <th style={{ textAlign: 'left' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button onClick={() => navigate(`./${c.id}/edit`)}>Editar</button>
                    <button onClick={() => remove(c.id)} style={{ marginLeft: 8 }}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
