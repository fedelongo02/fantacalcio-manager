function CardSquadra({ squadra, onApri, onElimina }) {
  return (
    <div className="team-card">
      <h3>⚽ {squadra.nome}</h3>

      <p>💰 Crediti: {squadra.crediti}</p>

      <p>👥 Giocatori: {squadra.rosa.length}</p>

      <div>
        <button className="primary-btn" onClick={() => onApri(squadra)}>
          Apri squadra
        </button>

        <button className="delete-btn" onClick={() => onElimina(squadra.id)}>
          Elimina
        </button>
      </div>
    </div>
  );
}

export default CardSquadra;
