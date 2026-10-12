import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin, udhetimet } from "@/lib/udhetimet";

// Next-i i paraprodhon këto tri adresa kur ndërtohet aplikacioni. Një id tjetër
// (p.sh. 99) shërbehet kur kërkohet dhe përfundon te notFound() më poshtë.
export function generateStaticParams() {
  return udhetimet.map((u) => ({ id: u.id }));
}

// Në këtë version të Next-it, params vjen si Promise — duhet "await".
export default async function DetajetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  // Id që nuk ekziston (p.sh. /udhetimi/99): shfaqet not-found.tsx.
  if (!udhetim) {
    notFound();
  }

  return (
    <main>
      <Link className="back" href="/">
        ← Kthehu te lista
      </Link>
      <h1>
        {udhetim.nisja} → {udhetim.destinacioni}
      </h1>
      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <p>Vende të lira: {udhetim.vende}</p>

      {/* Pa vende të lira butoni është i çaktivizuar (button disabled). */}
      {udhetim.vende > 0 ? (
        <Link className="action" href={`/udhetimi/${udhetim.id}/kerkesa`}>
          Kërko vend
        </Link>
      ) : (
        <button className="action" type="button" disabled>
          Nuk ka vende të lira
        </button>
      )}
    </main>
  );
}
