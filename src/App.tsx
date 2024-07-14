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

  /*
  return (
    <div className="bg-red-400 min-h-screen">
      <div className="flex flex-row h-screen">
        <div className="flex-none w-32 bg-green-300">
          <div className="flex flex-col items-center my-10">
            <img src="tauri.svg" alt="Logo" className="p-5" />
            <h1>Lmec-delta0</h1>

            <div className="flex flex-col gap-5 justify-center">
              <button className="hover:bg-gray-200 rounded-xl px-4 py-1">
                <VscDebugDisconnect size={32} className="text-blue-400" />
              </button>

              <button className="hover:bg-gray-200 rounded-xl px-4 py-1">
                <VscDebugDisconnect size={32} className="text-blue-400" />
              </button>

              <button className="hover:bg-gray-200 rounded-xl px-4 py-1">
                <VscDebugDisconnect size={32} className="text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-blue-400">
          <h1>Otro lado</h1>
        </div>
      </div>
    </div>
  );*/

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
