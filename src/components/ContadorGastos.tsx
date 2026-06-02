import { useState, useEffect } from "react";

function ContadorGastos() {
  const GASTO_ANUAL_2024 = 260_000_000;
  const GASTO_POR_SEGUNDO = GASTO_ANUAL_2024 / (365 * 24 * 60 * 60);

  const agora = new Date();
  const inicioAno = new Date(agora.getFullYear(), 0, 1);
  const segundosPassados = (agora.getTime() - inicioAno.getTime()) / 1000;
  const gastoInicial = segundosPassados * GASTO_POR_SEGUNDO;

  const [gasto, setGasto] = useState(gastoInicial);

  useEffect(() => {
    const interval = setInterval(() => {
      setGasto((prev) => prev + GASTO_POR_SEGUNDO);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "24px 40px",
        background: "var(--bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
      }}
    >
      <p style={{ color: "var(--text-color)", opacity: 0.6, fontSize: "13px" }}>
        Gastos dos deputados em 2026 (estimativa)
      </p>
      <p
        style={{
          color: "var(--accent-color)",
          fontSize: "32px",
          fontWeight: "bold",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        R${" "}
        {gasto.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p style={{ color: "var(--text-color)", opacity: 0.6, fontSize: "13px" }}>
        Atualizado a cada segundo com base na média histórica
      </p>
    </div>
  );
}

export default ContadorGastos;
