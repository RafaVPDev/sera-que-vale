import { useState, useEffect } from "react";

interface Senador {
  codigo: string;
  nome: string;
  partido: string;
  uf: string;
  foto: string;
}

interface ParlamentarAPI {
  IdentificacaoParlamentar: {
    CodigoParlamentar: string;
    NomeParlamentar: string;
    SiglaPartidoParlamentar: string;
    UfParlamentar: string;
    UrlFotoParlamentar: string;
  };
}

export function useSenadores() {
  const [senadores, setSenadores] = useState<Senador[]>([]);

  useEffect(() => {
    fetch("https://legis.senado.leg.br/dadosabertos/senador/lista/atual.json")
      .then((res) => res.json())
      .then((data) => {
        const lista: ParlamentarAPI[] =
          data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
        const formatados = lista.map((p) => ({
          codigo: p.IdentificacaoParlamentar.CodigoParlamentar,
          nome: p.IdentificacaoParlamentar.NomeParlamentar,
          partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
          uf: p.IdentificacaoParlamentar.UfParlamentar,
          foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
        }));
        setSenadores(formatados);
      })
      .catch((err) => console.error("Erro ao buscar senadores:", err));
  }, []);

  return { senadores };
}
