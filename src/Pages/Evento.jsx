import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoCard from "../Components/PhotoCard";
import Lightbox from "../Components/Lightbox";
import "./Evento.css";

function Evento() {
  const { codigo } = useParams();

  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 🔤 FORMATA NOME DO EVENTO
  const formatarNome = (codigo) => {
    return codigo
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 🚀 BUSCAR FOTOS
  useEffect(() => {
  const buscarFotos = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/evento/${codigo}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setFotos(data);
      } else {
        console.error("Resposta inválida:", data);
        setFotos([]);
      }
    } catch (err) {
      console.error("Erro:", err);
      setFotos([]);
    } finally {
      setLoading(false);
    }
  };

  buscarFotos();
}, [codigo]);

  // 📦 DOWNLOAD ZIP
  const baixarTodas = () => {
    window.open(`http://localhost:5000/download/${codigo}`, "_blank");
  };

  return (
    <div className="event-container">

      {/* 🔥 MARCA */}
      <p
        style={{
          textAlign: "center",
          opacity: 0.6,
          marginBottom: "5px",
          letterSpacing: "3px",
          fontSize: "12px",
        }}
      >
        BLESS SMILE PHOTOGRAPHY
      </p>

      {/* 🎯 TÍTULO BONITO */}
      <h2 className="event-title">
        {formatarNome(codigo)}
      </h2>

      {/* BOTÃO DOWNLOAD */}
      {fotos.length > 0 && !loading && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button className="button" onClick={baixarTodas}>
            ⬇️ Baixar Todas
          </button>
        </div>
      )}

      {/* ⏳ LOADING */}
      {loading ? (
        <p className="loading">Carregando fotos...</p>
      ) : fotos.length === 0 ? (
        <p className="loading">Nenhuma foto encontrada</p>
      ) : (
        <div className="gallery">
          {fotos.map((foto, index) => (
            <div key={index} onClick={() => setLightboxIndex(index)}>
              <PhotoCard url={foto} index={index} />
            </div>
          ))}
        </div>
      )}

      {/* 🔍 LIGHTBOX */}
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