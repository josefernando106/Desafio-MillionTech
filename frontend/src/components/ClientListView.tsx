import { Link } from "react-router-dom";
import type { Client } from "./Forms";
import Button from "@mui/material/Button";

export default function ClientsListView({
  clients,
  loading,
  error,
  remove,
  navigate,
}: {
  clients: Client[];
  loading: boolean;
  error: string | null;
  remove: (id: string) => void;
  navigate: (path: string) => void;
}) {
  return (
    <div className="client-container">
      <div className="client-card">
        <h2>Clientes</h2>
            <p style={{ fontSize: 22, color: "gray" }}>Lista de clientes cadastrados</p>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: 12,
          }}
        >
         
          <div>
            <Link to="new">
              <Button variant="contained">Adicionar</Button>
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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td >{c.phone}</td>
                  <td>
                    <button onClick={() => navigate(`./${c.id}/edit`)}>
                      Editar
                    </button>
                    <button
                      onClick={() => remove(c.id)}                      
                      className="button-delete"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
