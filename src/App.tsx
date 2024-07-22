import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import useDarkMode from "use-dark-mode";

function App() {
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //setGreetMsg(await invoke("greet", { name }));
  }
  
  const darkMode = useDarkMode(false);

  return (
    <>
      <BrowserRouter>
        <div className={`${darkMode.value ? 'dark': ''} flex`}>
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
