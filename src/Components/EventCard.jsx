function EventCard({ evento, deletar }) {
  return (
    <div className="event-card">
      <div>
        <strong>{evento.nome}</strong>
        <p>Código: {evento.codigo}</p>
      </div>

      <div className="event-actions">
        <button className="button" onClick={() => deletar(evento.codigo)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default EventCard;