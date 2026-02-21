import { useEffect, useState } from 'react'
import { Link, useNavigate, Routes, Route } from 'react-router-dom'
import type { Client } from '../components/Forms'
import { ClientForm } from '../components/Clients'


function useClientsStorage() {
  const key = 'clients'
  const load = (): Client[] => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }
  const save = (items: Client[]) => localStorage.setItem(key, JSON.stringify(items))
  return { load, save }
}

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
  const storage = useClientsStorage()
  const [clients, setClients] = useState<Client[]>([])
  const navigate = useNavigate()

  useEffect(() => setClients(storage.load()), [])

  const remove = (id: string) => {
    const next = clients.filter((c) => c.id !== id)
    setClients(next)
    storage.save(next)
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
        {clients.length === 0 ? (
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

