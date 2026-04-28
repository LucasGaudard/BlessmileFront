import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "../Components/Lightbox";
import "./Evento.css";

const API_URL = "https://blessmile-het5.onrender.com";

function Evento() {
  const { codigo } = useParams();

  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/evento/${codigo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPOSTA BACKEND:", data);

        if (data?.fotos && Array.isArray(data.fotos)) {
          setFotos(data.fotos);
        } else {
          setFotos([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar fotos:", err);
        setFotos([]);
        setLoading(false);
      });
  }, [codigo]);

  const baixarTodas = async () => {
    for (let i = 0; i < fotos.length; i++) {
      const response = await fetch(fotos[i]);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `foto-${i}.jpg`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
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
        {fotos.length > 0 ? (
          fotos.map((url, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              style={{
                width: "100%",
                height: "250px",
                overflow: "hidden",
                borderRadius: "12px",
                background: "#222",
                cursor: "pointer",
              }}
            >
              <img
                src={url}
                alt={`Foto ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            Nenhuma foto encontrada
          </p>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <Lightbox
          fotos={fotos}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          fechar={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Evento;