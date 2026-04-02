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
    <div className="photo-card">
      {!loaded && <div className="skeleton"></div>}

      <img
        className={`photo ${loaded ? "loaded" : ""}`}
        src={url}
        alt={`Foto ${index}`}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      <button className="download-btn" onClick={downloadImagem}>
        ⬇️
      </button>
    </div>
  );
}

export default PhotoCard;