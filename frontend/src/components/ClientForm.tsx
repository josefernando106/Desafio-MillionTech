import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../services/api";

export function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      apiClient
        .getClient(id)
        .then((c) => {
          setName(c.name);
          setEmail(c.email);
          setPhone(c.phone || "");
        })
        .catch((err) => {
          setError(err?.message || "Erro ao carregar cliente");
        });
    }
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (id) {
        await apiClient.updateClient(id, {
          name,
          email,
          phone: phone || undefined,
        });
      } else {
        await apiClient.createClient({
          name,
          email,
          phone: phone || undefined,
        });
      }
      navigate("/clients");
    } catch (err: any) {
      setError(err?.message || "Erro ao salvar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{id ? "Editar cliente" : "Novo cliente"}</h2>
        {error && (
          <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
        )}
        <form onSubmit={submit}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => navigate("/clients")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
