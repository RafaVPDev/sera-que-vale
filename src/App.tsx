import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./useTheme";
import HomePage from "./pages/HomePage";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <HomePage theme={theme} />
    </div>
  );
}

export default App;
