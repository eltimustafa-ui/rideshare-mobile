// Të dhënat e udhëtimeve. Janë të sajuara: nuk ka bazë të dhënash,
// as llogari, as pagesë — vetëm një listë që e lexojnë të tre ekranet.

export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

export const udhetimet: Udhetim[] = [
  {
    id: "1",
    nisja: "Prishtinë",
    destinacioni: "AAB",
    ora: "08:00",
    vendtakimi: "Stacioni i autobusëve",
    vende: 2,
  },
  {
    id: "2",
    nisja: "Fushë Kosovë",
    destinacioni: "AAB",
    ora: "08:15",
    vendtakimi: "Te stacioni kryesor",
    vende: 1,
  },
  {
    id: "3",
    nisja: "Lipjan",
    destinacioni: "AAB",
    ora: "07:45",
    vendtakimi: "Qendra e qytetit",
    vende: 0,
  },
];

// Kthen udhëtimin me këtë id, ose undefined nëse nuk ekziston (p.sh. "99").
// Faqet e thërresin dhe, kur del undefined, thërrasin notFound().
export function gjejUdhetimin(id: string): Udhetim | undefined {
  return udhetimet.find((u) => u.id === id);
}
