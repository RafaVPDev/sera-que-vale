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

const dadosFalsosSenadores = [
  { nome: "Senador A", valor: 980000 },
  { nome: "Senador B", valor: 870000 },
  { nome: "Senador C", valor: 820000 },
  { nome: "Senador D", valor: 790000 },
  { nome: "Senador E", valor: 750000 },
  { nome: "Senador F", valor: 710000 },
  { nome: "Senador G", valor: 680000 },
  { nome: "Senador H", valor: 640000 },
  { nome: "Senador I", valor: 600000 },
  { nome: "Senador J", valor: 570000 },
];

const dadosFalsosDeputados = [
  { nome: "Deputado A", valor: 920000 },
  { nome: "Deputado B", valor: 860000 },
  { nome: "Deputado C", valor: 800000 },
  { nome: "Deputado D", valor: 760000 },
  { nome: "Deputado E", valor: 720000 },
  { nome: "Deputado F", valor: 690000 },
  { nome: "Deputado G", valor: 650000 },
  { nome: "Deputado H", valor: 610000 },
  { nome: "Deputado I", valor: 580000 },
  { nome: "Deputado J", valor: 540000 },
];

interface TopDezGraficoProps {
  aba: "senadores" | "deputados";
  theme: "light" | "dark";
}

function TopDezGrafico({ aba, theme }: TopDezGraficoProps) {
  const dados =
    aba === "senadores" ? dadosFalsosSenadores : dadosFalsosDeputados;

  const textColor = theme === "dark" ? "#E8E8E8" : "#1A1A1A";
  const titleColor = theme === "dark" ? "#FFDF00" : "#002776";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const data = {
    labels: dados.map((d) => d.nome),
    datasets: [
      {
        label: "Total de Gastos (R$)",
        data: dados.map((d) => d.valor),
        backgroundColor: "#009C3B",
        borderColor: "#FFDF00",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Top 10 ${aba === "senadores" ? "Senadores" : "Deputados"} que mais gastaram`,
        color: titleColor,
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        background: "var(--bg-card)",
        borderRadius: "12px",
        padding: "24px",
        marginTop: "16px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default TopDezGrafico;
