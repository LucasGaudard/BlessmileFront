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
        console.log("FOTOS DO BACK:", data);

        if (Array.isArray(data)) {
          setFotos(data);
        } else if (data.fotos) {
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

  // 🔥 COMO VEM DO CLOUDINARY, USA DIRETO
  const fotosFormatadas = fotos;

  // 📥 BAIXAR TODAS (funcionando de verdade)
  const baixarTodas = async () => {
    for (let i = 0; i < fotosFormatadas.length; i++) {
      const response = await fetch(fotosFormatadas[i]);
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
        {fotosFormatadas.map((url, index) => (
          <div key={index} onClick={() => setLightboxIndex(index)}>
            <img src={url} style={{ width: "100%" }} />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <Lightbox
          fotos={fotosFormatadas}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          fechar={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default Evento;