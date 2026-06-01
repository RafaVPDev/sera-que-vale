import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function PoliticoPage() {
  const { tipo, nome } = useParams();
  const navigate = useNavigate();

  const nomeFormatado = nome
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

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
        }}
      >
        <p
          style={{
            color: "var(--text-color)",
            opacity: 0.6,
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {tipo === "senador" ? "Senador" : "Deputado"}
        </p>
        <h1
          style={{
            color: "var(--title-color)",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          {nomeFormatado}
        </h1>
        <p
          style={{ color: "var(--text-color)", opacity: 0.6, marginTop: "8px" }}
        >
          Partido • Estado • X anos de mandato
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {[
          { label: "Total Gasto", valor: "R$ 980.000" },
          { label: "Média Nacional", valor: "R$ 720.000" },
          { label: "Acima da Média", valor: "+36%" },
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
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "8px",
              }}
            >
              {card.valor}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          borderRadius: "12px",
          padding: "24px",
          textAlign: "center",
          color: "var(--text-color)",
          opacity: 0.5,
        }}
      >
        Gráficos e termômetro virão aqui
      </div>
    </div>
  );
}

export default PoliticoPage;
