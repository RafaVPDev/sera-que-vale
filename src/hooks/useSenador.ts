import { useState, useEffect } from "react";

interface SenadorDetalhe {
  codigo: string;
  nome: string;
  nomeCompleto: string;
  partido: string;
  uf: string;
  foto: string;
  email: string;
  dataNascimento: string;
}

interface SenadorAPI {
  IdentificacaoParlamentar: {
    CodigoParlamentar: string;
    NomeParlamentar: string;
    NomeCompletoParlamentar: string;
    SiglaPartidoParlamentar: string;
    UfParlamentar: string;
    UrlFotoParlamentar: string;
    EmailParlamentar: string;
  };
  DadosBasicosParlamentar: {
    DataNascimento: string;
  };
}

export function useSenador(codigo: string) {
  const [senador, setSenador] = useState<SenadorDetalhe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!codigo) return;

    fetch(`https://legis.senado.leg.br/dadosabertos/senador/${codigo}.json`)
      .then((res) => res.json())
      .then((data) => {
        const p: SenadorAPI = data.DetalheParlamentar.Parlamentar;
        setSenador({
          codigo: p.IdentificacaoParlamentar.CodigoParlamentar,
          nome: p.IdentificacaoParlamentar.NomeParlamentar,
          nomeCompleto: p.IdentificacaoParlamentar.NomeCompletoParlamentar,
          partido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
          uf: p.IdentificacaoParlamentar.UfParlamentar,
          foto: p.IdentificacaoParlamentar.UrlFotoParlamentar,
          email: p.IdentificacaoParlamentar.EmailParlamentar,
          dataNascimento: p.DadosBasicosParlamentar.DataNascimento,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar senador:", err);
        setLoading(false);
      });
  }, [codigo]);

  return { senador, loading };
}
