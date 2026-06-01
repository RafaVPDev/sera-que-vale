import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopDezGrafico from "../components/TopDezGrafico";
import Autocomplete from "../components/Autocomplete";
import { useSenadores } from "../hooks/useSenadores";
import { useDeputados } from "../hooks/useDeputados";

type Aba = "senadores" | "deputados";

interface HomePageProps {
  theme: "light" | "dark";
}

function HomePage({ theme }: HomePageProps) {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("senadores");
  const [busca, setBusca] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const navigate = useNavigate();
  const { senadores } = useSenadores();
  const { deputados } = useDeputados();

  const sugestoesFiltradas =
    abaAtiva === "senadores"
      ? senadores
          .filter((s) => s.nome.toLowerCase().includes(busca.toLowerCase()))
          .slice(0, 8)
      : deputados
          .filter((d) => d.nome.toLowerCase().includes(busca.toLowerCase()))
          .slice(0, 8);

  function handleConsultar() {
    if (!busca.trim()) return;
    const sugestao = sugestoesFiltradas[0];
    if (!sugestao) return;
    const nomeSlug = sugestao.nome.trim().toLowerCase().replace(/\s+/g, "-");
    const tipo = abaAtiva === "senadores" ? "senador" : "deputado";
    navigate(`/${tipo}/${sugestao.codigo}/${nomeSlug}`);
  }

  function handleSelect(codigo: string, nome: string) {
    setBusca(nome);
    setMostrarSugestoes(false);
    const nomeSlug = nome.trim().toLowerCase().replace(/\s+/g, "-");
    const tipo = abaAtiva === "senadores" ? "senador" : "deputado";
    navigate(`/${tipo}/${codigo}/${nomeSlug}`);
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
        Consulte os gastos dos políticos brasileiros
      </p>

      <div style={{ display: "flex", gap: "0px" }}>
        <button
          onClick={() => {
            setAbaAtiva("senadores");
            setBusca("");
          }}
          style={{
            padding: "10px 32px",
            border: "2px solid var(--border-color)",
            borderRight: "1px solid var(--border-color)",
            borderRadius: "8px 0 0 8px",
            background:
              abaAtiva === "senadores"
                ? "var(--accent-color)"
                : "var(--bg-card)",
            color: abaAtiva === "senadores" ? "#FFFFFF" : "var(--text-color)",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Senadores
        </button>
        <button
          onClick={() => {
            setAbaAtiva("deputados");
            setBusca("");
          }}
          style={{
            padding: "10px 32px",
            border: "2px solid var(--border-color)",
            borderLeft: "1px solid var(--border-color)",
            borderRadius: "0 8px 8px 0",
            background:
              abaAtiva === "deputados"
                ? "var(--accent-color)"
                : "var(--bg-card)",
            color: abaAtiva === "deputados" ? "#FFFFFF" : "var(--text-color)",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Deputados
        </button>
      </div>

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
            placeholder={`Digite o nome do ${abaAtiva === "senadores" ? "senador" : "deputado"}...`}
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

      <TopDezGrafico aba={abaAtiva} theme={theme} />
    </div>
  );
}

export default HomePage;
