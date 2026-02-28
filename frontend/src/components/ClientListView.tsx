import { Link } from "react-router-dom";
import type { Client } from "./Forms";

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
    <div className="login-container">
      <div className="login-card">
        <h2>Clientes</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div>Lista de clientes cadastrados</div>
          <div>
            <Link to="new">
              <button>Adicionar</button>
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
                <th style={{ textAlign: "left" }}>Nome</th>
                <th style={{ textAlign: "left" }}>Email</th>
                <th style={{ textAlign: "left" }}>Telefone</th>
                <th style={{ textAlign: "left" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button onClick={() => navigate(`./${c.id}/edit`)}>
                      Editar
                    </button>
                    <button
                      onClick={() => remove(c.id)}
                      style={{ marginLeft: 8 }}
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
