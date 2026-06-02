import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGastosDeputado } from "../hooks/useGastosDeputado";
import { useDeputado } from "../hooks/useDeputado";
import Modal from "../components/Modal";
import GraficoCategorias from "../components/GraficoCategorias";
import GraficoTemporal from "../components/GraficoTemporal";

type Periodo = "ano_atual" | "dois_anos" | "todos";

interface PoliticoPageProps {
  theme: "light" | "dark";
}

function PoliticoPage({ theme }: PoliticoPageProps) {
  const { codigo, nome } = useParams();
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState<Periodo>("ano_atual");
  const [mostrarModal, setMostrarModal] = useState(false);
  const { gastos, loading: loadingGastos } = useGastosDeputado(
    codigo ?? "",
    periodo,
  );
  const { deputado } = useDeputado(codigo ?? "");

  const nomeFormatado = nome
    ?.replace(/-/g, " ")
    .split(" ")
    .map(
      (palavra) =>
        palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase(),
    )
    .join(" ");

  const totalGasto = gastos.reduce((acc, g) => acc + g.valorLiquido, 0);

  const mesMaisCaro = useMemo(() => {
    if (gastos.length === 0) return "...";
    const porMes = gastos.reduce(
      (acc, g) => {
        const chave = `${String(g.mes).padStart(2, "0")}/${g.ano}`;
        acc[chave] = (acc[chave] || 0) + g.valorLiquido;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(porMes).sort((a, b) => b[1] - a[1])[0][0];
  }, [gastos]);

  const periodos: { valor: Periodo; label: string }[] = [
    { valor: "ano_atual", label: "2026" },
    { valor: "dois_anos", label: "Últimos 2 anos" },
    { valor: "todos", label: "Todos os mandatos" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "900px",
        margin: "0 auto",
        marginTop: "40px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          color: "var(--accent-color)",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "fit-content",
        }}
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <div
        style={{
          background: "var(--bg-card)",
          borderRadius: "12px",
          padding: "32px",
          borderLeft: "4px solid var(--accent-color)",
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {deputado?.foto && (
          <img
            src={deputado.foto}
            alt={deputado.nome}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid var(--accent-color)",
            }}
          />
        )}
        <div>
          <p
            style={{
              color: "var(--text-color)",
              opacity: 0.6,
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Deputado Federal
          </p>
          <h1
            style={{
              color: "var(--title-color)",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {deputado?.nome ?? nomeFormatado}
          </h1>
          <p
            style={{
              color: "var(--text-color)",
              opacity: 0.6,
              marginTop: "8px",
            }}
          >
            {deputado
              ? `${deputado.partido} • ${deputado.uf} • ${deputado.legislatura}ª Legislatura (${2019 + (deputado.legislatura - 56) * 4}-${2023 + (deputado.legislatura - 56) * 4})`
              : "Carregando..."}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0px" }}>
        {periodos.map((p, i) => (
          <button
            key={p.valor}
            onClick={() => {
              if (p.valor === "todos") {
                setMostrarModal(true);
                return;
              }
              setPeriodo(p.valor);
            }}
            style={{
              padding: "10px 20px",
              border: "2px solid var(--border-color)",
              borderRadius:
                i === 0
                  ? "8px 0 0 8px"
                  : i === periodos.length - 1
                    ? "0 8px 8px 0"
                    : "0",
              borderLeft:
                i > 0
                  ? "1px solid var(--border-color)"
                  : "2px solid var(--border-color)",
              background:
                periodo === p.valor ? "var(--accent-color)" : "var(--bg-card)",
              color: periodo === p.valor ? "#FFFFFF" : "var(--text-color)",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {[
          {
            label: "Total Gasto",
            valor: loadingGastos
              ? "Carregando..."
              : `R$ ${totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Mês Mais Caro",
            valor: loadingGastos ? "..." : mesMaisCaro,
          },
          {
            label: "Registros",
            valor: loadingGastos ? "..." : gastos.length.toString(),
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              border: "1px solid var(--border-color)",
            }}
          >
            <p
              style={{
                color: "var(--text-color)",
                opacity: 0.6,
                fontSize: "14px",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                color: "var(--title-color)",
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "8px",
              }}
            >
              {card.valor}
            </p>
          </div>
        ))}
      </div>

      {!loadingGastos && gastos.length > 0 && (
        <GraficoCategorias gastos={gastos} theme={theme} />
      )}

      {!loadingGastos && gastos.length > 0 && (
        <GraficoTemporal gastos={gastos} theme={theme} />
      )}

      {mostrarModal && (
        <Modal
          mensagem="Buscar todos os mandatos pode demorar alguns minutos. Deseja continuar?"
          onConfirmar={() => {
            setPeriodo("todos");
            setMostrarModal(false);
          }}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default PoliticoPage;
