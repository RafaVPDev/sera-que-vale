import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Gasto {
  tipoDespesa: string;
  valorLiquido: number;
}

interface GraficoCategoriaProps {
  gastos: Gasto[];
  theme: "light" | "dark";
}

function GraficoCategorias({ gastos, theme }: GraficoCategoriaProps) {
  const textColor = theme === "dark" ? "#E8E8E8" : "#1A1A1A";
  const titleColor = theme === "dark" ? "#FFDF00" : "#002776";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const categorias = gastos.reduce(
    (acc, g) => {
      const cat = g.tipoDespesa || "Outros";
      acc[cat] = (acc[cat] || 0) + g.valorLiquido;
      return acc;
    },
    {} as Record<string, number>,
  );

  const ordenado = Object.entries(categorias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const nomesCompletos = ordenado.map(([cat]) => cat);

  const data = {
    labels: ordenado.map(([cat]) =>
      cat.length > 20 ? cat.slice(0, 20) + "..." : cat,
    ),
    datasets: [
      {
        label: "Total (R$)",
        data: ordenado.map(([, val]) => val),
        backgroundColor: "#009C3B",
        borderColor: "#FFDF00",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y" as const,
    layout: {
      padding: { left: 10 },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Gastos por Categoria",
        color: titleColor,
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          title: (items: { dataIndex: number }[]) =>
            nomesCompletos[items[0].dataIndex],
          label: (ctx: { parsed: { x: number } }) =>
            `R$ ${ctx.parsed.x.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (val: string | number) =>
            `R$ ${Number(val).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`,
        },
        grid: { color: gridColor },
      },
      y: {
        ticks: {
          color: textColor,
          font: { size: 11 },
          crossAlign: "far" as const,
        },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "12px",
        padding: "24px 24px 24px 40px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoCategorias;
