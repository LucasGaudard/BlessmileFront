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
      }}
    >
      {!loaded && <div className="skeleton"></div>}

      <img
        className={`photo ${loaded ? "loaded" : ""}`}
        src={url}
        alt={`Foto ${index}`}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      <button
        className="download-btn"
        onClick={(e) => {
          e.stopPropagation(); // evita abrir lightbox
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