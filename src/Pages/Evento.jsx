import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoCard from "../Components/Photocard";
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
      .catch(() => {
        setFotos([]);
        setLoading(false);
      });
  }, [codigo]);

  const baixarTodas = () => {
  const link = document.createElement("a");
  link.href = `${API_URL}/download/${codigo}`;
  link.target = "_self"; // 🔥 importante
  document.body.appendChild(link);
  link.click();
  link.remove();
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
        {fotos.map((url, index) => (
          <div key={index} onClick={() => setLightboxIndex(index)}>
            <PhotoCard url={url} index={index} />
          </div>
        ))}
      </div>

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