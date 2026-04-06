import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoCard from "../Components/PhotoCard";
import Lightbox from "../Components/Lightbox";
import "./Evento.css";

function Evento() {
  const { codigo } = useParams();

  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const API_URL = "https://blessmile-het5.onrender.com";

  // 🔤 FORMATA NOME
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
        setErro(false);

        const res = await fetch(`${API_URL}/evento/${codigo}`);

        if (!res.ok) throw new Error("Erro na requisição");

        const data = await res.json();

        if (Array.isArray(data)) {
          setFotos(data);
        } else {
          setFotos([]);
        }

      } catch (err) {
        console.error("Erro ao buscar fotos:", err);
        setErro(true);
        setFotos([]);
      } finally {
        setLoading(false);
      }
    };

    buscarFotos();
  }, [codigo]);

  // 📦 DOWNLOAD
  const baixarTodas = () => {
    window.open(`${API_URL}/download/${codigo}`, "_blank");
  };

  return (
    <div className="event-container">

      <p className="brand">BLESS SMILE PHOTOGRAPHY</p>

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

      {/* LOADING */}
      {loading && <p className="loading">Carregando fotos...</p>}

      {/* ERRO */}
      {erro && (
        <p className="loading">Erro ao carregar o evento 😢</p>
      )}

      {/* SEM FOTOS */}
      {!loading && !erro && fotos.length === 0 && (
        <p className="loading">Nenhuma foto encontrada</p>
      )}

      {/* GALERIA */}
      {!loading && !erro && fotos.length > 0 && (
        <div className="gallery">
          {fotos.map((foto, index) => (
            <div key={index} onClick={() => setLightboxIndex(index)}>
              <PhotoCard url={foto} index={index} />
            </div>
          ))}
        </div>
      )}

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