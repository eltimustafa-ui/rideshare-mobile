"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rideshare-favorites";

export default function RuajUdhëtimin({ udhetimId }: { udhetimId: string }) {
  const [ruajtur, setRuajtur] = useState(false);
  const [poRuhet, setPoRuhet] = useState(false);
  const [mesazhi, setMesazhi] = useState("");

  useEffect(() => {
    try {
      const ruajturLista = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      const lista = Array.isArray(ruajturLista) ? ruajturLista : [];
      setRuajtur(lista.includes(udhetimId));
    } catch {
      setRuajtur(false);
    }
  }, [udhetimId]);

  async function ruaj() {
    if (poRuhet) return;

    const para = ruajtur;
    setPoRuhet(true);
    setMesazhi("Po ruhet...");

    try {
      const ruajturLista = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      const lista = Array.isArray(ruajturLista) ? ruajturLista.filter((v) => typeof v === "string") : [];

      if (lista.includes(udhetimId)) {
        setRuajtur(true);
        setMesazhi("Udhëtimi është tashmë ruajtur te të preferuarat.");
        setPoRuhet(false);
        return;
      }

      if (typeof window !== "undefined") {
        const forceFail = new URLSearchParams(window.location.search).get("failSave") === "1";
        if (forceFail) {
          throw new Error("Server failed");
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 700));

      const eRe = [...lista, udhetimId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(eRe));
      setRuajtur(true);
      setMesazhi("Udhëtimi u ruajt me sukses te të preferuarat.");
    } catch {
      setRuajtur(para);
      setMesazhi("Ruajtja dështoi. Provo përsëri.");
    } finally {
      setPoRuhet(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="action"
        data-testid="save-trip"
        data-state={poRuhet ? "saving" : ruajtur ? "saved" : "idle"}
        disabled={poRuhet}
        onClick={ruaj}
      >
        {poRuhet ? "Po ruhet..." : ruajtur ? "Ruaj përsëri" : "Ruaj udhëtimin te të preferuarat"}
      </button>
      <p role="status" data-testid="save-trip-status">
        {mesazhi || (ruajtur ? "Udhëtimi u ruajt me sukses. Ruaj përsëri." : "")}
      </p>
    </div>
  );
}
