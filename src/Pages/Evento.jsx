import { useState } from "react";
import "./Eventos.css";

const API_URL = "https://blessmile-het5.onrender.com";

function Eventos() {
  const [evento, setEvento] = useState("");
  const [fotos, setFotos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFotosChange = (e) => {
    setFotos(e.target.files);
  };

  const handleUpload = async () => {
    if (!evento) {
      setMensagem("Digite o nome do evento");
      return;
    }

    if (fotos.length === 0) {
      setMensagem("Selecione pelo menos uma foto");
      return;
    }

    try {
      setLoading(true);
      setMensagem("");

      const formData = new FormData();
      formData.append("evento", evento);

      for (let i = 0; i < fotos.length; i++) {
        formData.append("fotos", fotos[i]);
      }

      const senha = localStorage.getItem("adminSenha");

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          "x-admin-password": senha,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro no upload");
      }

      setMensagem("✅ Upload realizado com sucesso!");
      setEvento("");
      setFotos([]);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao enviar fotos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventos-container">
      <div className="eventos-card">
        <h2>Enviar Fotos</h2>

        <input
          type="text"
          placeholder="Nome do evento"
          value={evento}
          onChange={(e) => setEvento(e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={handleFotosChange}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Fotos"}
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}

export default Eventos;