import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "2px solid var(--border-color)",
        borderRadius: "20px",
        padding: "6px 14px",
        cursor: "pointer",
        color: "var(--text-color)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "14px",
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {theme === "dark" ? "Claro" : "Escuro"}
    </button>
  );
}

export default ThemeToggle;
