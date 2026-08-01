function RiepilogoSquadre({ squadre, onApriSquadra }) {
  return (
    <div className="teams-summary">
      <h2>Squadre della lega</h2>

      <div className="teams-grid">
        {squadre.map((squadra) => (
          <div className="team-card" key={squadra.id}>
            <h3>⚽ {squadra.nome}</h3>

            <p>💰 Crediti: {squadra.crediti}</p>

            <p>👥 Giocatori: {squadra.rosa.length}</p>

            <button
              className="primary-btn"
              onClick={() => onApriSquadra(squadra)}
            >
              Apri squadra
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiepilogoSquadre;
