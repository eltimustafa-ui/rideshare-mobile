import RuajUdhëtimin from "@/components/RuajUdhëtimin";

const udhetimi = { id: "demo-java-09", nisja: "Ferizaj", destinacioni: "AAB", ora: "08:15" };

export default function ProvaJava09() {
  return (
    <main>
      <h1>{udhetimi.nisja} – {udhetimi.destinacioni}</h1>
      <p>ID {udhetimi.id} · Ora: {udhetimi.ora}</p>
      <p>Faqe prove · të dhëna fiktive</p>
      <RuajUdhëtimin udhetimId={udhetimi.id} />
    </main>
  );
}
