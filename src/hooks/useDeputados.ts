import { useState, useEffect } from "react";

interface Deputado {
  codigo: string;
  nome: string;
  partido: string;
  uf: string;
  foto: string;
}

interface DeputadoAPI {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
}

export function useDeputados() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "/api/camara/deputados?itens=513&ordem=ASC&ordenarPor=nome",
      {
        headers: { Accept: "application/json" },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        const lista: DeputadoAPI[] = data.dados;
        const formatados = lista.map((d) => ({
          codigo: String(d.id),
          nome: d.nome,
          partido: d.siglaPartido,
          uf: d.siglaUf,
          foto: d.urlFoto,
        }));
        setDeputados(formatados);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar deputados:", err);
        setLoading(false);
      });
  }, []);

  return { deputados, loading };
}