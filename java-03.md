# RideShare — Java 3

## Çfarë ndërtova
Ndërtova tri ekranet e RideShare në Next.js me të dhëna fiktive: listën me tri karta, faqen e detajeve te `/udhetimi/[id]` dhe faqen e kërkesës te `/udhetimi/[id]/kerkesa`. Shtova edhe faqen "Udhëtimi nuk u gjet" për ID që nuk ekzistojnë.

## Provat që bëra
### Prova 1: Lista në telefon
Hapa faqen kryesore në pamjen e telefonit (375 px); prisja tri karta pa lëvizje anash; pashë saktësisht tri karta dhe faqja nuk lëvizte anash.

### Prova 2: Detajet e udhëtimit të dytë
Klikova kartën 2; prisja adresën /udhetimi/2 dhe vendtakimin e saj; pashë adresën /udhetimi/2 me "Fushë Kosovë – AAB", orën 08:15 dhe vendtakimin "Te stacioni kryesor".
Shënova edhe çfarë ndodhi te karta 3 (zero vende) dhe te /udhetimi/99: te karta 3 butoni "Nuk ka vende të lira" është i çaktivizuar, ndërsa /udhetimi/99 shfaq faqen 404 "Udhëtimi nuk u gjet" me lidhje për te lista.

### Prova 3: Kërkesa në pritje
Klikova Kërko vend; prisja “Simulim: Në pritje”, pa rezervim real; pashë titullin “Simulim: Në pritje” dhe tekstin që kërkesa nuk është dërguar te shoferi. Pastaj u ktheva te detajet dhe lista: lidhjet "Kthehu te detajet" dhe "Kthehu te lista" më sollën te /udhetimi/2 dhe pastaj te faqja kryesore me tri karta.

## Çfarë do të përmirësoj
Provat i bëra vetëm unë, jo me koleg. Javën tjetër do t'i provoj me një koleg dhe do të shtoj një formë të vërtetë për kërkesën, sepse tani është vetëm simulim.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI (Claude Code): e krijoi projektin Next.js dhe i shtoi skedarët sipas kodit të shembullit të ushtrimit, hoqi dy opsione eksperimentale nga `next.config.ts` që e prishnin ndërtimin dhe i provoi faqet. Unë i lexova rezultatet dhe e plotësova këtë raport; provën me koleg nuk e bëra.
