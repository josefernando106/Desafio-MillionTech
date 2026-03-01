import type { Client } from "./Forms";

export default function ClientsListView({
  clients,
  remove,
  navigate,
}: {
  clients: Client[];
  remove: (id: string) => void;
  navigate: (path: string) => void;
}) {
  return (
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
            <td>{c.phone}</td>
            <td >
              <button onClick={() => navigate(`./${c.id}/edit`)} style={{marginRight: '10px'}}>Editar</button>
              <button onClick={() => remove(c.id)} className="button-delete">
                Remover
              </button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
