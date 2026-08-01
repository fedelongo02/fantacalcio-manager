import { useState, useEffect } from "react";
import CreaLega from "./components/CreaLega";
import DashboardLega from "./components/DashboardLega";
import "./App.css";

function App() {
  const [leghe, setLeghe] = useState(() => {
    const legheSalvate = localStorage.getItem("legheFantacalcio");

    return legheSalvate ? JSON.parse(legheSalvate) : [];
  });

  const [legaSelezionata, setLegaSelezionata] = useState(null);

  // Salvataggio automatico delle leghe

  useEffect(() => {
    localStorage.setItem("legheFantacalcio", JSON.stringify(leghe));
  }, [leghe]);

  function creaLega(nuovaLega) {
    const legaConId = {
      ...nuovaLega,
      id: Date.now(),
    };

    setLeghe([...leghe, legaConId]);
  }

  function entraNellaLega(lega) {
    setLegaSelezionata(lega);
  }

  function aggiornaLega(legaModificata) {
    setLeghe((legheAttuali) =>
      legheAttuali.map((lega) =>
        lega.id === legaModificata.id ? legaModificata : lega,
      ),
    );

    setLegaSelezionata(legaModificata);
  }

  function eliminaLega(idLega) {
    const nuoveLeghe = leghe.filter((lega) => lega.id !== idLega);

    setLeghe(nuoveLeghe);
    setLegaSelezionata(null);
  }

  return (
    <div className="app">
      <h1>⚽ Fantacalcio Manager</h1>

      {!legaSelezionata ? (
        <>
          <CreaLega onCreaLega={creaLega} />

          <div className="card">
            <h2>🏆 Le mie leghe</h2>

            {leghe.length === 0 ? (
              <p>Nessuna lega creata</p>
            ) : (
              leghe.map((lega) => (
                <div key={lega.id} className="league-item">
                  <h3>{lega.nome}</h3>

                  <p>💰 Crediti: {lega.creditiIniziali}</p>

                  <p>👥 Squadre: {lega.numeroSquadre}</p>

                  <button
                    className="primary-btn"
                    onClick={() => entraNellaLega(lega)}
                  >
                    Entra nella lega
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <DashboardLega
          lega={legaSelezionata}
          setLega={aggiornaLega}
          eliminaLega={eliminaLega}
          tornaHome={() => setLegaSelezionata(null)}
        />
      )}
    </div>
  );
}

export default App;
