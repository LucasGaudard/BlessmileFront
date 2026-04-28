import { useState } from "react";

function PhotoCard({ url, index }) {
  const [loaded, setLoaded] = useState(false);

  const downloadImagem = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `foto-${index}.jpg`;
    link.click();
  };

  return (
    <div
      className="photo-card"
      style={{
        width: "100%",
        height: "250px",
        overflow: "hidden",
        position: "relative",
        background: "#eee",
      }}
    >
      {/* imagem */}
      <img
        src={url}
        alt={`Foto ${index}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} // 🔥 IMPORTANTE
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 1, // 🔥 força aparecer
        }}
      />

      {/* loading (opcional) */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#ddd",
          }}
        />
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          downloadImagem();
        }}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        ⬇️
      </button>
    </div>
  );
}

export default PhotoCard;