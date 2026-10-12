import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin, udhetimet } from "@/lib/udhetimet";

// Next-i i paraprodhon këto tri adresa kur ndërtohet aplikacioni. Një id tjetër
// (p.sh. 99) shërbehet kur kërkohet dhe përfundon te notFound() më poshtë.
export function generateStaticParams() {
  return udhetimet.map((u) => ({ id: u.id }));
}

export default async function KerkesaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) {
    notFound();
  }

  return (
    <main>
      <Link className="back" href={`/udhetimi/${udhetim.id}`}>
        ← Kthehu te detajet
      </Link>

      {udhetim.vende > 0 ? (
        <>
          <h1>Simulim: Në pritje</h1>
          <p>
            {`Kërkesa për ${udhetim.nisja} nuk është dërguar te shoferi. Ruajtjen dhe konfirmimin real do t'i shtojmë më vonë.`}
          </p>
        </>
      ) : (
        // Këtu mund të arrihet vetëm me adresë të shkruar me dorë, sepse
        // butoni në detaje është i çaktivizuar kur vende = 0.
        <>
          <h1>Nuk ka vende të lira</h1>
          <p>{`Udhëtimi nga ${udhetim.nisja} është plot, prandaj nuk mund të dërgohet kërkesë.`}</p>
        </>
      )}
    </main>
  );
}
