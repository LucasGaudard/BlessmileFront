import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Evento from "./Pages/Evento";
import Admin from "./Pages/Admin"; // 🔥 IMPORT

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:codigo" element={<Evento />} />
        <Route path="/admin" element={<Admin />} /> {/* 🔥 ROTA */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;