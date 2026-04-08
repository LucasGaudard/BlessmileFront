import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Evento.css";

const API_URL = "https://blessmile-het5.onrender.com";

function Evento() {
  const { codigo } = useParams();
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${API_URL}/evento/${codigo}`)
    .then(res => res.json())
    .then(data => {
      console.log("RESPOSTA BACKEND:", data);

      // 🔥 TRATAMENTO CORRETO
      if (Array.isArray(data)) {
        setFotos(data);
      } else if (data.fotos && Array.isArray(data.fotos)) {
        setFotos(data.fotos);
      } else {
        console.error("Formato inesperado:", data);
        setFotos([]);
      }

      setLoading(false);
    })
    .catch(err => {
      console.error("Erro ao buscar fotos:", err);
      setFotos([]);
      setLoading(false);
    });
}, [codigo]);

  // 📥 baixar uma foto
  const baixarFoto = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "foto.jpg";
    link.click();
  };

  // 📥 baixar todas
  const baixarTodas = async () => {
    for (let i = 0; i < fotos.length; i++) {
      setTimeout(() => {
        baixarFoto(fotos[i]);
      }, i * 500);
    }
  };

  // 🗑️ deletar foto
  const deletarFoto = async (url) => {
    const senha = localStorage.getItem("adminSenha");

    if (!window.confirm("Deseja deletar essa foto?")) return;

    await fetch(`${API_URL}/foto`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": senha,
      },
      body: JSON.stringify({ url }),
    });

    setFotos(fotos.filter(f => f !== url));
  };

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="event-container">
      <h1 className="event-title">Evento: {codigo}</h1>

      <div className="top-actions">
        <button className="button" onClick={baixarTodas}>
          Baixar todas
        </button>
      </div>

      <div className="gallery">
        {fotos.map((foto, index) => (
          <div className="photo-card" key={index}>
            <img
              src={foto.url ? `https://blessmile-het5.onrender.com${foto.url}` : foto}
              alt=""
              className="photo"
            />

            <div className="overlay">
              <button onClick={() => baixarFoto(foto)}>⬇</button>
              <button onClick={() => deletarFoto(foto)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Evento;