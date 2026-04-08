import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Evento: {codigo}</h1>

      {fotos.length === 0 ? (
        <p>Nenhuma foto encontrada 😢</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {fotos.map((foto, i) => (
            <img
              key={i}
              src={foto}
              alt=""
              style={{ width: "200px", borderRadius: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Evento;