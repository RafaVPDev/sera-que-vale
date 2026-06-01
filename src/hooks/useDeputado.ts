import { useDeputados } from "./useDeputados";

interface DeputadoDetalhe {
  nome: string;
  partido: string;
  uf: string;
  foto: string;
}

export function useDeputado(codigo: string): {
  deputado: DeputadoDetalhe | null;
  loading: boolean;
} {
  const { deputados, loading } = useDeputados();

  const encontrado = deputados.find((d) => d.codigo === codigo);

  if (!encontrado) return { deputado: null, loading };

  return {
    deputado: {
      nome: encontrado.nome,
      partido: encontrado.partido,
      uf: encontrado.uf,
      foto: encontrado.foto,
    },
    loading,
  };
}
