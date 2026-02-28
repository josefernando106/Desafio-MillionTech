import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import type { Client } from "../components/Forms";
import { ClientForm } from "../components/ClientForm";
import ClientListView from "../components/ClientListView";
import { apiClient } from "../services/api";

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
      setError(err?.message || "Erro ao carregar clientes")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchClients()
  }, [])

  const remove = async (id: string) => {
    try {
      await apiClient.deleteClient(id)
      setClients(clients.filter((c) => c.id !== id))
    } catch (err: any) {
      setError(err?.message || "Erro ao remover cliente")
    }
  }

  return (
    <ClientListView
      clients={clients}
      loading={loading}
      error={error}
      remove={remove}
      navigate={navigate}
    />
  );
}
