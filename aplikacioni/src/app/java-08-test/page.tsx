import Vendtakimi from "@/components/Vendtakimi";

// Të dhëna fiktive: kjo faqe punon pa hyrje, pa Neon dhe pa sekrete.
const udhetimi = { id: "2", nisja: "Ferizaj", destinacioni: "AAB", ora: "08:15" };

export default function ProvaJava08() {
  return (
    <main>
      <h1>{udhetimi.nisja} – {udhetimi.destinacioni}</h1>
      <p>ID {udhetimi.id} · Ora: {udhetimi.ora} · Udhëtimi i Dritonit</p>
      <p>Faqe prove · të dhëna fiktive</p>
      <Vendtakimi />
    </main>
  );
}
