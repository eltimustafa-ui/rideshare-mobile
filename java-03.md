# Java 3 · RideShare nga skiza te kodi

Aplikacioni është në dosjen `aplikacioni/` (Next.js me App Router dhe TypeScript).
Të dhënat janë të sajuara (tre udhëtime), pa bazë të dhënash, pa llogari e pa pagesë.

## Rezultatet e tre testeve

**Testi 1 · lista në telefon:** Në gjerësi 375px lista tregon tre karta (Prishtinë, Fushë Kosovë, Lipjan), faqja nuk ka lëvizje anash dhe çdo lidhje "Shiko detajet" është 44px e lartë.

**Testi 2 · detajet e kartës 2, zero vende dhe ID 99:** Karta 2 hapet me "Vende të lira: 1" dhe butonin aktiv "Kërko vend", karta 3 hapet me "Vende të lira: 0" dhe butonin e çaktivizuar "Nuk ka vende të lira", kurse adresa `/udhetimi/99` shfaq faqen "Udhëtimi nuk u gjet".

**Testi 3 · mesazhi "Në pritje" dhe kthimi mbrapa:** Nga "Kërko vend" hapet faqja me titullin "Simulim: Në pritje", lidhja "← Kthehu te detajet" kthen te detajet e udhëtimit dhe lidhja "← Kthehu te lista" kthen te faqja kryesore.
