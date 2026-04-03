const API_URL = "https://blessmile-het5.onrender.com";

import { useState, useEffect } from "react";

function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const [evento, setEvento] = useState("");
  const [fotos, setFotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔒 PROTEÇÃO */
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");

    if (auth === "true") {
      setAutorizado(true);
      return;
    }

    const senha = prompt("Digite a senha do admin:");

    if (senha === "1234") {
      localStorage.setItem("adminAuth", "true");
      setAutorizado(true);
    } else {
      setAutorizado(false);
    }
  }, []);

  if (!autorizado) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Acesso negado
      </h1>
    );
  }

  /* 📸 UPLOAD + PREVIEW */
  const handleUpload = (e) => {
    const arquivos = Array.from(e.target.files);

    setFotos(arquivos);

    const previewUrls = arquivos.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  /* ❌ REMOVER FOTO */
  const removeFoto = (index) => {
    const novasFotos = fotos.filter((_, i) => i !== index);
    const novasPreview = preview.filter((_, i) => i !== index);

    setFotos(novasFotos);
    setPreview(novasPreview);
  };

  /* 🚀 ENVIAR PARA O BACKEND */
  const handleSubmit = async () => {
    if (!evento || fotos.length === 0) {
      alert("Preencha o nome do evento e selecione fotos");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      const eventoFormatado = evento.toLowerCase().trim();
      formData.append("evento", eventoFormatado);

      fotos.forEach((foto) => {
        formData.append("fotos", foto);
      });

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro no upload");
      }

      console.log("Fotos enviadas:", data.fotos);

      alert("Fotos enviadas com sucesso! 🚀");

      setEvento("");
      setFotos([]);
      setPreview([]);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar fotos ❌");
    } finally {
      setLoading(false);
    }
  };

  /* 🎨 UI */
  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Admin - Bless Smile</h1>

      <input
        className="input"
        type="text"
        placeholder="Nome do evento (ex: casamento-joao)"
        value={evento}
        onChange={(e) => setEvento(e.target.value)}
      />

      <input
        className="input"
        type="file"
        multiple
        onChange={handleUpload}
      />

      {preview.length > 0 && (
        <div className="gallery" style={{ marginTop: "20px" }}>
          {preview.map((img, index) => (
            <div className="photo-card" key={index}>
              <img src={img} className="photo loaded" />

              <button
                className="download-btn"
                onClick={() => removeFoto(index)}
                style={{ background: "red" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className={`button ${loading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Enviando..." : "Salvar Fotos"}
      </button>
    </div>
  );
}

export default Admin;