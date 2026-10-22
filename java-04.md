
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

## 6. Testimi

| Testi | Rezultati |
|---|---|
| Shfaqja e listës së udhëtimeve | Sukses |
| Lidhja me databazën Neon | Sukses |
| Ndryshimi i orës nga `08:15` në `08:25` në Neon | Sukses |
| Shfaqja e detajeve të udhëtimit | Sukses |
| Udhëtimi me zero vende të lira | Sukses |
| Hapja e një ID-je që nuk ekziston (`99`) | Sukses |
| Shfaqja e simulimit të kërkesës për vend | Sukses |

Gjatë testimit, ora e udhëtimit të dytë u ndryshua drejtpërdrejt në Neon dhe ndryshimi u shfaq në aplikacion pa modifikuar kodin. Ora u rikthye më pas në `08:15`.

## 7. Kufizimet

Kërkesa për rezervim është ende simulim. Ajo nuk ruhet në databazë dhe nuk i dërgohet shoferit. Gjithashtu, të dhënat e përdorura janë fiktive.

## 8. Përfundimi

Në këtë ushtrim, aplikacioni RideShare u lidh me një databazë PostgreSQL në Neon. U implementua leximi i të dhënave për listën dhe detajet e udhëtimeve, si dhe u testuan rastet kryesore të funksionimit.

## 9. Puna e ardhshme

- Shtimi i ruajtjes reale të kërkesave për rezervim.
- Testimi i sjelljes kur databaza nuk është e disponueshme.
- Testimi me një koleg/e.
