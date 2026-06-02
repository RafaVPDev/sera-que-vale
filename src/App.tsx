import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import PoliticoPage from "./pages/PoliticoPage";
import Particulas from "./components/Particulas";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="fundo-gradiente"
      style={{ minHeight: "100vh", padding: "24px", position: "relative" }}
    >
      <Particulas />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/deputado/:codigo/:nome"
            element={<PoliticoPage theme={theme} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
