'use client'
import { useNavigate, useParams } from 'react-router-dom'
import type { Client } from './Forms'
import { useEffect, useState } from 'react'


export function ClientForm() {
  const storage = useClientsStorage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => setClients(storage.load()), [])

  useEffect(() => {
    if (id) {
      const c = clients.find((x) => x.id === id)
      if (c) {
        setName(c.name)
        setEmail(c.email)
        setPhone(c.phone || '')
        setAddress(c.address || '')
      }
    }
  }, [id, clients])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = [...clients]
    if (id) {
      const idx = next.findIndex((x) => x.id === id)
      if (idx >= 0) {
        next[idx] = { id, name, email, phone, address }
      }
    } else {
      const newClient: Client = { id: String(Date.now()), name, email, phone, address }
      next.push(newClient)
    }
    storage.save(next)
    navigate('/clients')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{id ? 'Editar cliente' : 'Novo cliente'}</h2>
        <form onSubmit={submit}>
          <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit">Salvar</button>
            <button type="button" className="secondary" onClick={() => navigate('/clients')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
function useClientsStorage() {
  return {
    load: () => {
      const data = localStorage.getItem('clients')
      return data ? JSON.parse(data) : []
    },
    save: (clients: Client[]) => {
      localStorage.setItem('clients', JSON.stringify(clients))
    }
  }
}

