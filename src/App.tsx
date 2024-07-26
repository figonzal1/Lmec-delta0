import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import { useTheme } from "./assets/hooks/useTheme";

function App() {
  const { darkMode } = useTheme();

  return (
    <>
      <BrowserRouter>
        <div className={`${darkMode ? "dark" : ""} flex`}>
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/home" Component={Home} />
              <Route path="/integrations" Component={Integrations} />
              <Route path="/settings" Component={Settings} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
