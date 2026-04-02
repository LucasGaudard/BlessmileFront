import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const acessarGaleria = () => {
    if (!codigo.trim()) return;
    navigate(`/evento/${codigo}`);
  };

  return (
    <div className="home-container">

      {/* GALERIA DE FUNDO */}
      <div className="background-slider"></div>

      <div className="overlay"></div>

      <div className="content">

        {/* LOGO */}
        <h1 className="logo">BlesSmile</h1>

        {/* TEXTO */}
        <h2 className="title">Suas memórias, eternizadas </h2>
        <p className="subtitle">
          Digite seu código e reviva cada momento especial
        </p>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Ex: casamento-LucaseJennifer"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="input"
        />

        {/* BOTÃO */}
        <button className="button" onClick={acessarGaleria}>
          Acessar galeria
        </button>

      </div>
    </div>
  );
}

export default Home;