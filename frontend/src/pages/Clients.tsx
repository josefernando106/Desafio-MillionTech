import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import type { Client } from "../components/Forms";
import { ClientForm } from "../components/ClientForm";
import ClientListView from "../components/ClientListView";
import { apiClient } from "../services/api";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import ClientsPdfReport from "../components/ClientsPdfReport";

export default function Clients() {
  return (
    <Routes>
      <Route path="/" element={<ClientsList />} />
      <Route path="new" element={<ClientForm />} />
      <Route path=":id/edit" element={<ClientForm />} />
    </Routes>
  );
}

function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getClients();
      setClients(data);
    } catch (err: any) {
      setError(err?.message || "Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const remove = async (id: string) => {
    try {
      await apiClient.deleteClient(id);
      setClients(clients.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err?.message || "Erro ao remover cliente");
    }
  };

  return (
    <div className="client-container">
      <div className="client-card">
        <h2>Clientes</h2>
        <p style={{ fontSize: 22, color: "gray" }}>
          Lista de clientes cadastrados
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {clients.length > 0 && (
              <Button
                variant="contained"
                style={{ backgroundColor: "crimson", marginRight: 8 }}
                onClick={async () => {
                  const blob = await pdf(
                    <ClientsPdfReport clients={clients} />,
                  ).toBlob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "relatorio-clientes.pdf";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Relatorio PDF
              </Button>
            )}
            <Link to="new">
              <Button variant="contained" style={{ backgroundColor: "green" }}>
                Adicionar
              </Button>
            </Link>
          </div>
        </div>
        {error && (
          <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
        )}
        {loading ? (
          <p>Carregando...</p>
        ) : clients.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <ClientListView
            clients={clients}
            remove={remove}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
}
