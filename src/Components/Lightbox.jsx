import { useEffect, useRef, useState } from "react";

function Lightbox({ fotos, index, setIndex, fechar }) {
  const fotoAtual = fotos[index];

  const [zoom, setZoom] = useState(1);

  const startX = useRef(0);
  const endX = useRef(0);

  // 👉 Navegação
  const proxima = () => {
    setIndex((prev) => (prev + 1) % fotos.length);
    setZoom(1);
  };

  const anterior = () => {
    setIndex((prev) =>
      prev === 0 ? fotos.length - 1 : prev - 1
    );
    setZoom(1);
  };

  // 👉 Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") proxima();
      if (e.key === "ArrowLeft") anterior();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 👉 PRELOAD próxima imagem
  useEffect(() => {
    const nextIndex = (index + 1) % fotos.length;
    const img = new Image();
    img.src = fotos[nextIndex];
  }, [index]);

  // 👉 SWIPE MOBILE
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;

    const diff = startX.current - endX.current;

    if (diff > 50) proxima(); // arrastou pra esquerda
    if (diff < -50) anterior(); // arrastou pra direita
  };

  // 👉 ZOOM SCROLL
  const handleZoom = (e) => {
    e.stopPropagation();

    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 0.2, 3));
    } else {
      setZoom((z) => Math.max(z - 0.2, 1));
    }
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={fechar}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ❌ fechar */}
      <button className="lightbox-close" onClick={fechar}>
        ✕
      </button>

      {/* 🔢 contador */}
      <div className="lightbox-counter">
        {index + 1} / {fotos.length}
      </div>

      {/* ◀️ */}
      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          anterior();
        }}
      >
        ‹
      </button>

      {/* 🖼️ imagem */}
      <img
        src={fotoAtual}
        className="lightbox-img"
        style={{ transform: `scale(${zoom})` }}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleZoom}
        alt="Foto ampliada"
      />

      {/* ▶️ */}
      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          proxima();
        }}
      >
        ›
      </button>
    </div>
  );
}

export default Lightbox;