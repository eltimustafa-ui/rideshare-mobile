
# Java 4 — RideShare me Neon

## 1. Përshkrimi i projektit

RideShare është një aplikacion për shfaqjen e udhëtimeve drejt AAB. Në Java 4, aplikacioni u lidh me databazën Neon (PostgreSQL), në mënyrë që të dhënat e udhëtimeve të lexohen nga databaza dhe jo nga të dhëna statike në kod.

## 2. Teknologjitë e përdorura

- Next.js
- React
- TypeScript
- Neon PostgreSQL
- `@neondatabase/serverless`
- Git dhe GitHub

## 3. Struktura e databazës

U krijua tabela `udhetimet` me kolonat:

| Kolona | Përshkrimi |
|---|---|
| `id` | Identifikuesi unik i udhëtimit |
| `nisja` | Vendi i nisjes |
| `destinacioni` | Destinacioni |
| `ora` | Ora e nisjes |
| `vendtakimi` | Vendi ku takohen udhëtarët |
| `vende` | Numri i vendeve të lira |

Tabela përmban tri udhëtime fiktive drejt AAB-së.

## 4. Lidhja me Neon

U instalua paketa `@neondatabase/serverless` dhe u krijua skedari `src/lib/db.ts` për lidhjen me databazën.

Adresa e lidhjes ruhet në variablën e mjedisit `DATABASE_URL`, në skedarin lokal `.env.local`. Ky skedar nuk duhet të publikohet në GitHub, sepse përmban të dhëna sekrete.

## 5. Leximi i të dhënave

Në `src/lib/udhetimet.ts` u krijuan funksionet:

- `lexoUdhetimet()` — lexon të gjitha udhëtimet nga tabela `udhetimet`.
- `gjejUdhetimin(id)` — gjen një udhëtim sipas ID-së.

Faqja kryesore dhe faqet e detajeve përdorin këto funksione për t'i marrë të dhënat nga databaza.

## 6. Provat

### Prova 1: Ndryshimi ruhet në databazë

Në Neon SQL Editor ekzekutova `UPDATE udhetimet SET ora = '08:25' WHERE id = '2';` dhe rifreskova listën. Karta 2 tregoi 08:25, dhe detajet e ID 2 treguan po 08:25, pa ndryshuar kodin. Pastaj e ktheva orën në `08:15`. ID 3 mbeti me zero vende dhe ID 99 shfaqi "Udhëtimi nuk u gjet".

### Prova 2: Lista bosh nuk është gabim lidhjeje

Te `lexoUdhetimet` ndryshova përkohësisht pyetjen në `FROM udhetimet WHERE false ORDER BY id` dhe rifreskova. Faqja shfaqi "Nuk ka udhëtime për momentin." dhe jo mesazh gabimi lidhjeje. Pastaj hoqa `WHERE false` dhe lista u rregullua: u kthyen tri kartat.

### Prova 3: Lidhja mungon dhe pastaj rikthehet

Në `.env.local` riemërova përkohësisht `DATABASE_URL` në `DATABASE_URL_PA_TEST`, ndalova dhe rinisa `npm run dev` dhe rifreskova listën. Faqja shfaqi "Nuk u lidhëm me databazën. Provo përsëri." Pastaj ktheva emrin `DATABASE_URL`, rinisa serverin dhe lista u rikthye normalisht.

## 7. Kufizimet

Kërkesa për rezervim është ende simulim. Ajo nuk ruhet në databazë dhe nuk i dërgohet shoferit. Gjithashtu, të dhënat e përdorura janë fiktive.

## 8. Përfundimi

Në këtë ushtrim, aplikacioni RideShare u lidh me një databazë PostgreSQL në Neon. U implementua leximi i të dhënave për listën dhe detajet e udhëtimeve, si dhe u testuan rastet kryesore të funksionimit.

## 9. Puna e ardhshme

- Shtimi i ruajtjes reale të kërkesave për rezervim.
- Testimi i sjelljes kur databaza nuk është e disponueshme.
- Testimi me një koleg/e.
