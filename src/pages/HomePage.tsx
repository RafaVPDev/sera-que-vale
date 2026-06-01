import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopDezGrafico from "../components/TopDezGrafico";
import Autocomplete from "../components/Autocomplete";
import { useDeputados } from "../hooks/useDeputados";

interface HomePageProps {
  theme: "light" | "dark";
}

function HomePage({ theme }: HomePageProps) {
  const [busca, setBusca] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const navigate = useNavigate();
  const { deputados } = useDeputados();

  const sugestoesFiltradas = deputados
    .filter((d) => d.nome.toLowerCase().includes(busca.toLowerCase()))
    .slice(0, 8);

  function handleConsultar() {
    if (!busca.trim()) return;
    const sugestao = sugestoesFiltradas[0];
    if (!sugestao) return;
    const nomeSlug = sugestao.nome.trim().toLowerCase().replace(/\s+/g, "-");
    navigate(`/deputado/${sugestao.codigo}/${nomeSlug}`);
  }

  function handleSelect(codigo: string, nome: string) {
    setBusca(nome);
    setMostrarSugestoes(false);
    const nomeSlug = nome.trim().toLowerCase().replace(/\s+/g, "-");
    navigate(`/deputado/${codigo}/${nomeSlug}`);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
        gap: "32px",
      }}
    >
      <h1
        style={{
          color: "var(--title-color)",
          fontSize: "48px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Será que Vale?
      </h1>

      <p
        style={{
          color: "var(--text-color)",
          fontSize: "18px",
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        Consulte os gastos dos deputados federais brasileiros
      </p>

      <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setMostrarSugestoes(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleConsultar()}
            onFocus={() => setMostrarSugestoes(true)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
            placeholder="Digite o nome do deputado..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "8px",
              border: "2px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-color)",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            onClick={handleConsultar}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "var(--accent-color)",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Consultar
          </button>
        </div>

        {mostrarSugestoes && (
          <Autocomplete
            sugestoes={sugestoesFiltradas}
            busca={busca}
            onSelect={handleSelect}
          />
        )}
      </div>

      <TopDezGrafico aba="deputados" theme={theme} />
    </div>
  );
}

export default HomePage;
