interface AutocompleteProps {
  sugestoes: { codigo: string; nome: string; partido: string; uf: string }[];
  busca: string;
  onSelect: (nome: string) => void;
}

function Autocomplete({ sugestoes, busca, onSelect }: AutocompleteProps) {
  if (!busca.trim() || sugestoes.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "var(--bg-card)",
        border: "2px solid var(--border-color)",
        borderRadius: "8px",
        marginTop: "4px",
        zIndex: 100,
        maxHeight: "240px",
        overflowY: "auto",
      }}
    >
      {sugestoes.map((s) => (
        <div
          key={s.codigo}
          onClick={() => onSelect(s.nome)}
          style={{
            padding: "12px 16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border-color)",
            color: "var(--text-color)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span style={{ fontWeight: "bold" }}>{s.nome}</span>
          <span style={{ fontSize: "13px", opacity: 0.6 }}>
            {s.partido} • {s.uf}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Autocomplete;
