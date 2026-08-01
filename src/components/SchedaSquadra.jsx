import { useState } from "react";

function SchedaSquadra({
  squadra,
  lega,
  setLega,
  setSquadraSelezionata,
  onIndietro,
}) {
  const [nome, setNome] = useState("");
  const [ruolo, setRuolo] = useState("P");
  const [prezzo, setPrezzo] = useState("");

  function aggiungiGiocatore(e) {
    e.preventDefault();

    if (nome.trim() === "" || prezzo === "") {
      alert("Compila tutti i campi");
      return;
    }

    const costo = Number(prezzo);

    if (costo > squadra.crediti) {
      alert("Crediti insufficienti");
      return;
    }

    const giocatoriRuolo = squadra.rosa.filter((g) => g.ruolo === ruolo).length;

    let limiteRuolo = 0;

    if (ruolo === "P") {
      limiteRuolo = lega.rose.portieri;
    }

    if (ruolo === "D") {
      limiteRuolo = lega.rose.difensori;
    }

    if (ruolo === "C") {
      limiteRuolo = lega.rose.centrocampisti;
    }

    if (ruolo === "A") {
      limiteRuolo = lega.rose.attaccanti;
    }

    if (giocatoriRuolo >= limiteRuolo) {
      alert(
        `Hai già raggiunto il limite di ${limiteRuolo} giocatori per questo ruolo`,
      );
      return;
    }

    const nuovoGiocatore = {
      id: Date.now(),
      nome,
      ruolo,
      prezzo: costo,
    };

    const nuoveSquadre = lega.squadre.map((s) => {
      if (s.id !== squadra.id) {
        return s;
      }

      return {
        ...s,
        crediti: s.crediti - costo,
        rosa: [...s.rosa, nuovoGiocatore],
      };
    });

    const nuovaLega = {
      ...lega,
      squadre: nuoveSquadre,
    };

    setLega(nuovaLega);

    const squadraAggiornata = nuoveSquadre.find((s) => s.id === squadra.id);

    setSquadraSelezionata(squadraAggiornata);

    setNome("");
    setRuolo("P");
    setPrezzo("");
  }

  function rimuoviGiocatore(idGiocatore) {
    const nuoveSquadre = lega.squadre.map((s) => {
      if (s.id !== squadra.id) {
        return s;
      }

      const giocatoreRimosso = s.rosa.find((g) => g.id === idGiocatore);

      return {
        ...s,

        crediti: s.crediti + giocatoreRimosso.prezzo,

        rosa: s.rosa.filter((g) => g.id !== idGiocatore),
      };
    });

    const nuovaLega = {
      ...lega,
      squadre: nuoveSquadre,
    };

    setLega(nuovaLega);

    const squadraAggiornata = nuoveSquadre.find((s) => s.id === squadra.id);

    setSquadraSelezionata(squadraAggiornata);
  }

  function contaRuoli() {
    return {
      portieri: squadra.rosa.filter((g) => g.ruolo === "P").length,

      difensori: squadra.rosa.filter((g) => g.ruolo === "D").length,

      centrocampisti: squadra.rosa.filter((g) => g.ruolo === "C").length,

      attaccanti: squadra.rosa.filter((g) => g.ruolo === "A").length,
    };
  }

  const ruoli = contaRuoli();

  return (
    <div>
      <div className="card">
        <h2>⚽ {squadra.nome}</h2>

        <p>💰 Crediti disponibili: {squadra.crediti}</p>

        <div className="team-summary">
          <h3>📋 Riepilogo rosa</h3>

          <p>🧤 Portieri: {ruoli.portieri}</p>

          <p>🛡 Difensori: {ruoli.difensori}</p>

          <p>🎯 Centrocampisti: {ruoli.centrocampisti}</p>

          <p>⚡ Attaccanti: {ruoli.attaccanti}</p>

          <p>👥 Totale giocatori: {squadra.rosa.length}</p>
        </div>

        <form onSubmit={aggiungiGiocatore} className="player-form">
          <h3>Aggiungi giocatore</h3>

          <input
            type="text"
            placeholder="Nome giocatore"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            className="primary-btn"
            value={ruolo}
            onChange={(e) => setRuolo(e.target.value)}
          >
            <option value="P">Portiere</option>
            <option value="D">Difensore</option>
            <option value="C">Centrocampista</option>
            <option value="A">Attaccante</option>
          </select>

          <input
            type="number"
            placeholder="Prezzo"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            Acquista
          </button>
        </form>

        <div className="player-list">
          <h3>Rosa</h3>

          {squadra.rosa.length === 0 ? (
            <p>Nessun giocatore acquistato</p>
          ) : (
            squadra.rosa.map((giocatore) => (
              <div className="player-item" key={giocatore.id}>
                <div className="player-info">
                  <span>
                    ⚽ {giocatore.nome} ({giocatore.ruolo})
                  </span>

                  <strong>{giocatore.prezzo} crediti</strong>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => rimuoviGiocatore(giocatore.id)}
                >
                  Rimuovi
                </button>
              </div>
            ))
          )}
        </div>

        <br />

        <button className="primary-btn" onClick={onIndietro}>
          ← Torna alle squadre
        </button>
      </div>
    </div>
  );
}

export default SchedaSquadra;
