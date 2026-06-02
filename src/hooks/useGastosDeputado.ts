import { useState, useEffect } from "react";

interface Gasto {
  ano: number;
  mes: number;
  tipoDespesa: string;
  dataDocumento: string;
  valorLiquido: number;
  nomeFornecedor: string;
}

type Periodo = "ano_atual" | "dois_anos" | "todos";

export function useGastosDeputado(codigo: string, periodo: Periodo) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!codigo) return;

    const anoAtual = new Date().getFullYear();
    const anoInicio =
      periodo === "ano_atual"
        ? anoAtual
        : periodo === "dois_anos"
          ? anoAtual - 1
          : 2019;

    async function buscarGastos() {
      setLoading(true);
      setGastos([]);
      let todosGastos: Gasto[] = [];

      for (let ano = anoInicio; ano <= anoAtual; ano++) {
        let pagina = 1;

        while (true) {
          const res = await fetch(
            `/api/camara/deputados/${codigo}/despesas?ano=${ano}&pagina=${pagina}&itens=100`,
            { headers: { Accept: "application/json" } },
          );
          const data = await res.json();

          if (!data.dados || data.dados.length === 0) break;

          const formatados = data.dados.map(
            (d: {
              ano: number;
              mes: number;
              tipoDespesa: string;
              dataDocumento: string;
              valorLiquido: number;
              nomeFornecedor: string;
            }) => ({
              ano: d.ano,
              mes: d.mes,
              tipoDespesa: d.tipoDespesa,
              dataDocumento: d.dataDocumento,
              valorLiquido: d.valorLiquido,
              nomeFornecedor: d.nomeFornecedor,
            }),
          );

          todosGastos = [...todosGastos, ...formatados];

          const links = data.links ?? [];
          const temProxima = links.some(
            (l: { rel: string }) => l.rel === "next",
          );
          if (!temProxima) break;
          pagina++;
        }
      }

      setGastos(todosGastos);
      setLoading(false);
    }

    buscarGastos();
  }, [codigo, periodo]);

  return { gastos, loading };
}
