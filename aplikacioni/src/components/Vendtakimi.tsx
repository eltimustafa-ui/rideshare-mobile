"use client";
import { useState } from "react";

type Gjendja = "idle" | "loading" | "success" | "denied" | "timeout" | "unavailable";

// Zgjedhja mbetet vetëm në këtë telefon. Koordinatat nuk ruhen dhe nuk dërgohen.
export default function Vendtakimi() {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabimi, setGabimi] = useState("");
  const [gjendja, setGjendja] = useState<Gjendja>("idle");
  const [mesazhi, setMesazhi] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmo() {
    const pastruar = teksti.trim();
    if (!pastruar) {
      setGabimi("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }
    setGabimi("");
    setVendtakimi(pastruar);
  }

  function kurMerretPozicioni(position: GeolocationPosition) {
    setSaktesia(Math.round(position.coords.accuracy));
    setGjendja("success");
    setMesazhi("Pozicioni u mor. Shkruaj vetë emrin e vendtakimit.");
  }

  function kurDeshtonLeximi(error: Pick<GeolocationPositionError, "code">) {
    setSaktesia(null);
    if (error.code === 1) {
      setGjendja("denied");
      setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
    } else if (error.code === 3) {
      setGjendja("timeout");
      setMesazhi("Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.");
    } else {
      setGjendja("unavailable");
      setMesazhi("Pozicioni nuk është i disponueshëm. Provo sërish ose shkruaj vendtakimin vetë.");
    }
  }

  function perdorVendndodhjen() {
    setSaktesia(null);
    if (!navigator.geolocation) {
      setGjendja("unavailable");
      setMesazhi("Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }
    setGjendja("loading");
    setMesazhi("Po kërkojmë vendndodhjen…");
    navigator.geolocation.getCurrentPosition(
      kurMerretPozicioni,
      kurDeshtonLeximi,
      { timeout: 10000 }
    );
  }

  return (
    <section className="trip-card">
      <h2>Zgjidh vendtakimin</h2>

      <label htmlFor="vendtakimi-fusha">Shkruaj vendtakimin</label>
      <input
        id="vendtakimi-fusha"
        className="field"
        data-testid="meeting-input"
        value={teksti}
        onChange={(e) => {
          setTeksti(e.target.value);
          setGabimi("");
        }}
      />
      <p role="alert" data-testid="meeting-error">{gabimi}</p>

      <button className="action" data-testid="confirm-meeting" onClick={konfirmo}>
        Konfirmo në telefon
      </button>
      <p>
        Vendtakimi i konfirmuar:{" "}
        <strong data-testid="confirmed-meeting">{vendtakimi}</strong>
      </p>

      <button
        className="action"
        data-testid="locate-me"
        disabled={gjendja === "loading"}
        onClick={perdorVendndodhjen}
      >
        Përdor vendndodhjen time
      </button>
      <p role="status" data-testid="location-status" data-state={gjendja}>{mesazhi}</p>
      <p data-testid="location-accuracy">
        {saktesia !== null && `Saktësia rreth ${saktesia} m`}
      </p>

      <p>Zgjedhja mbetet në këtë telefon. Shoferi ende nuk e merr.</p>
    </section>
  );
}
