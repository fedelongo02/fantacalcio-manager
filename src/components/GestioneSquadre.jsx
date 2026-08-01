import { useState } from "react";
import CardSquadra from "./CardSquadra";

function GestioneSquadre({ lega, setLega, onApriSquadra }) {
  const [nomeSquadra, setNomeSquadra] = useState("");

  function aggiungiSquadra(e) {
    e.preventDefault();

    if (nomeSquadra.trim() === "") {
      alert("Inserisci un nome squadra");
      return;
    }

    if (lega.squadre.length >= lega.numeroSquadre) {
      alert("Hai già raggiunto il numero massimo di squadre");
      return;
    }

    const nuovaSquadra = {
      id: Date.now(),
      nome: nomeSquadra,
      crediti: lega.creditiIniziali,
      rosa: [],
    };

    setLega({
      ...lega,
      squadre: [...lega.squadre, nuovaSquadra],
    });

    setNomeSquadra("");
  }

  // funzione per eliminare una squadra dalla lega
  function eliminaSquadra(id) {
    const squadreAggiornate = lega.squadre.filter(
      (squadra) => squadra.id !== id,
    );

    // aggiorna lo stato della lega rimuovendo la squadra con l'id specificato
    setLega({
      ...lega,
      squadre: squadreAggiornate,
    });
  }

  // renderizza il componente con un form per aggiungere squadre e una lista delle squadre create
  return (
    <div>
      <h2>Gestione squadre</h2>

      <form className="form-box" onSubmit={aggiungiSquadra}>
        <input
          type="text"
          placeholder="Nome squadra"
          value={nomeSquadra}
          onChange={(e) => setNomeSquadra(e.target.value)}
        />

        <button
          className="primary-btn"
          disabled={lega.squadre.length >= lega.numeroSquadre}
        >
          Aggiungi squadra
        </button>
      </form>

      <h3>Squadre create:</h3>

      <ul>
        <div className="teams-grid">
          {lega.squadre.map((squadra) => (
            <CardSquadra
              key={squadra.id}
              squadra={squadra}
              onApri={onApriSquadra}
              onElimina={eliminaSquadra}
            />
          ))}
        </div>
      </ul>
    </div>
  );
}

export default GestioneSquadre;
