import { useState } from "react";
import GestioneSquadre from "./GestioneSquadre";
import SchedaSquadra from "./SchedaSquadra";

function DashboardLega({ lega, setLega, eliminaLega, tornaHome }) {
  const [squadraSelezionata, setSquadraSelezionata] = useState(null);
  function confermaEliminazione() {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare tutta la lega?",
    );

    if (conferma) {
      eliminaLega(lega.id);
    }
  }

  return (
    <div>
      <div className="card">
        <h2>🏆 {lega.nome}</h2>

        <p>💰 Crediti iniziali: {lega.creditiIniziali}</p>

        <p>
          👥 Squadre: {lega.squadre.length}/{lega.numeroSquadre}
        </p>

        <button className="secondary-btn" onClick={tornaHome}>
          ← Torna alla home
        </button>

        <button className="delete-btn" onClick={confermaEliminazione}>
          Elimina lega
        </button>
      </div>

      {squadraSelezionata ? (
        <SchedaSquadra
          squadra={squadraSelezionata}
          lega={lega}
          setLega={setLega}
          setSquadraSelezionata={setSquadraSelezionata}
          onIndietro={() => setSquadraSelezionata(null)}
        />
      ) : (
        <>
          <div className="card">
            <GestioneSquadre
              lega={lega}
              setLega={setLega}
              onApriSquadra={setSquadraSelezionata}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardLega;
