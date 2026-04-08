import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Evento.css";

const API_URL = "https://blessmile-het5.onrender.com";

function Evento() {
  const { codigo } = useParams();
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarFotos = async () => {
      try {
        const res = await fetch(`${API_URL}/evento/${codigo}`);
        const data = await res.json();

        setFotos(data.fotos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    buscarFotos();
  }, [codigo]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="event-container">
      <h1 className="event-title">Evento: {codigo}</h1>

      {fotos.length === 0 ? (
        <p className="loading">Nenhuma foto encontrada 😢</p>
      ) : (
        <div className="gallery">
          {fotos.map((foto, index) => (
            <div className="photo-card" key={index}>
              <img src={foto} alt="" className="photo" />

              {/* 🔽 BOTÃO DE DOWNLOAD */}
              <a href={foto} download target="_blank" rel="noopener noreferrer">
                <button className="download-btn">⬇</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Evento;