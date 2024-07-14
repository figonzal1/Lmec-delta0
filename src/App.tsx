import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Integrations from "./pages/Integrations";

function App() {
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/home" Component={Home} />
              <Route path="/integrations" Component={Integrations} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
