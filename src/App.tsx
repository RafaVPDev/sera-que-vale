import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import PoliticoPage from "./pages/PoliticoPage";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <Routes>
        <Route path="/" element={<HomePage theme={theme} />} />
        <Route path="/:tipo/:codigo/:nome" element={<PoliticoPage />} />
      </Routes>
    </div>
  );
}

export default App;
