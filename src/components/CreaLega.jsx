import { useState } from "react";

function CreaLega({ onCreaLega }) {
  const [nome, setNome] = useState("");
  const [crediti, setCrediti] = useState(500);
  const [numeroSquadre, setNumeroSquadre] = useState(6);
  const [portieri, setPortieri] = useState(3);
  const [difensori, setDifensori] = useState(8);
  const [centrocampisti, setCentrocampisti] = useState(8);
  const [attaccanti, setAttaccanti] = useState(6);

  function handleSubmit(e) {
    e.preventDefault();

    // controlla se il nome della lega è vuoto
    if (nome.trim() === "") {
      alert("Inserisci il nome della lega");
      return;
    }

    // chiama la funzione onCreaLega passata come prop con i dati della nuova lega
    onCreaLega({
      nome,
      creditiIniziali: Number(crediti),
      numeroSquadre: Number(numeroSquadre),

      rose: {
        portieri,
        difensori,
        centrocampisti,
        attaccanti,
      },

      squadre: [],
    });

    setNome("");
    setCrediti(500);
    setNumeroSquadre(6);
    setPortieri(3);
    setDifensori(8);
    setCentrocampisti(8);
    setAttaccanti(6);
  }

  // renderizza il componente con un form per creare una nuova lega
  return (
    <form onSubmit={handleSubmit} className="league-form">
      <h2>Crea una nuova lega</h2>

      <div className="league-layout">
        <div className="league-column">
          <h3>Dati lega</h3>

          <label>Nome lega</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Crediti iniziali</label>
          <input
            type="number"
            value={crediti}
            onChange={(e) => setCrediti(e.target.value)}
          />

          <label>Numero squadre</label>
          <input
            type="number"
            value={numeroSquadre}
            onChange={(e) => setNumeroSquadre(e.target.value)}
          />
        </div>

        <div className="league-column">
          <h3>Composizione rosa</h3>

          <label>Portieri</label>
          <input
            type="number"
            value={portieri}
            onChange={(e) => setPortieri(Number(e.target.value))}
          />

          <label>Difensori</label>
          <input
            type="number"
            value={difensori}
            onChange={(e) => setDifensori(Number(e.target.value))}
          />

          <label>Centrocampisti</label>
          <input
            type="number"
            value={centrocampisti}
            onChange={(e) => setCentrocampisti(Number(e.target.value))}
          />

          <label>Attaccanti</label>
          <input
            type="number"
            value={attaccanti}
            onChange={(e) => setAttaccanti(Number(e.target.value))}
          />
        </div>
      </div>

      <button className="primary-btn" type="submit">
        Crea Lega
      </button>
    </form>
  );
}

export default CreaLega;
