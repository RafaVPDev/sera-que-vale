import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface Gasto {
  ano: number;
  mes: number;
  valorLiquido: number;
}

interface GraficoTemporalProps {
  gastos: Gasto[];
  theme: "light" | "dark";
}

const MESES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function GraficoTemporal({ gastos, theme }: GraficoTemporalProps) {
  const textColor = theme === "dark" ? "#E8E8E8" : "#1A1A1A";
  const titleColor = theme === "dark" ? "#FFDF00" : "#002776";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const porMes = gastos.reduce(
    (acc, g) => {
      const chave = `${g.ano}-${String(g.mes).padStart(2, "0")}`;
      acc[chave] = (acc[chave] || 0) + g.valorLiquido;
      return acc;
    },
    {} as Record<string, number>,
  );

  const labels = Object.keys(porMes).sort();
  const valores = labels.map((l) => porMes[l]);
  const labelsFormatados = labels.map((l) => {
    const [ano, mes] = l.split("-");
    return `${MESES[parseInt(mes) - 1]}/${ano}`;
  });

  const data = {
    labels: labelsFormatados,
    datasets: [
      {
        label: "Gastos (R$)",
        data: valores,
        borderColor: "#009C3B",
        backgroundColor: "rgba(0, 156, 59, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#009C3B",
        pointBorderColor: "#FFDF00",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Evolução dos Gastos por Mês",
        color: titleColor,
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) =>
            `R$ ${ctx.parsed.y.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (val: string | number) =>
            `R$ ${Number(val).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`,
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
        padding: "24px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoTemporal;
