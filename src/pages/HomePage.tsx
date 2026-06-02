import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, TrendingUp } from "lucide-react";
import Autocomplete from "../components/Autocomplete";
import { useDeputados } from "../hooks/useDeputados";
import ContadorGastos from "../components/ContadorGastos";

function HomePage() {
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

  const cards = [
    {
      icon: <Search size={28} color="var(--accent-color)" />,
      titulo: "513 Deputados",
      descricao:
        "Pesquise qualquer deputado federal em exercício e veja seus gastos detalhados",
    },
    {
      icon: <FileText size={28} color="var(--accent-color)" />,
      titulo: "Dados Oficiais",
      descricao:
        "Todas as informações vêm diretamente da API pública da Câmara dos Deputados",
    },
    {
      icon: <TrendingUp size={28} color="var(--accent-color)" />,
      titulo: "Análise Visual",
      descricao:
        "Gráficos de categorias e evolução temporal para entender como o dinheiro é gasto",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        gap: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h1
          className="titulo-principal"
          style={{
            color: "var(--title-color)",
            fontSize: "56px",
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
            maxWidth: "500px",
          }}
        >
          Consulte os gastos dos deputados federais brasileiros com dinheiro
          público
        </p>
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
      <ContadorGastos />
      <div
        className="grid-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "100%",
          maxWidth: "800px",
          marginTop: "8px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.titulo}
            style={{
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: "1px solid var(--border-color)",
            }}
          >
            {card.icon}
            <p
              style={{
                color: "var(--title-color)",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {card.titulo}
            </p>
            <p
              style={{
                color: "var(--text-color)",
                fontSize: "14px",
                opacity: 0.7,
                lineHeight: "1.5",
              }}
            >
              {card.descricao}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
