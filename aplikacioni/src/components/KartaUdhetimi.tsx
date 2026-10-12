import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

// Një kartë e vetme për listën. Përdoret tri herë te faqja kryesore,
// një herë për çdo udhëtim — kjo është komponenti i ripërdorshëm.
export default function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  return (
    <article className="card">
      <h2>
        {udhetim.nisja} → {udhetim.destinacioni}
      </h2>
      <p>Ora: {udhetim.ora}</p>
      <p>Vende të lira: {udhetim.vende}</p>
      <Link className="action" href={`/udhetimi/${udhetim.id}`}>
        Shiko detajet
      </Link>
    </article>
  );
}
