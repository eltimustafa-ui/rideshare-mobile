# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Shtova hyrjen me GitHub (NextAuth, OAuth) dhe një panel te `/panel`. Identiteti është ID-ja e llogarisë GitHub që vjen nga sesioni i verifikuar. Roli (`udhetar` ose `shofer`) ruhet në tabelën `profilet` në Neon dhe çdo hyrje e re fillon si udhëtar; roli nuk zgjidhet nga formulari. Pronësia është kolona `shofer_id` te `udhetimet`: vetëm shoferi që zotëron një udhëtim mund t'ia ndryshojë orën. Kontrolli bëhet në server, te `ndryshoOren` në `src/lib/lejet.ts`, ndaj ndryshimi i ID-së në formular nuk e kalon kontrollin. Skedarët e rinj janë `src/lib/auth.ts`, `src/lib/lejet.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/components/Hyrja.tsx`, `src/app/panel/page.tsx`, `src/app/panel/actions.ts` dhe `schema-java05.sql`.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

PLOTËSO_ME_REZULTATIN_REAL

### Prova 2: Shoferi ndryshon udhëtimin e vet

PLOTËSO_ME_REZULTATIN_REAL

### Prova 3: Veprimi pa leje refuzohet

PLOTËSO_ME_REZULTATIN_REAL

## Ku gjendet puna

Repository: https://github.com/eltimustafa-ui/rideshare-mobile. Kodi është në `aplikacioni/`, ndërsa skedarët e rinj janë ata të listuar më sipër.

## Çfarë mbetet për përmirësim

Kërkesa për vend është ende simulim: nuk ruhet në databazë dhe nuk njoftohet shoferi. Më pas do ta ruaj kërkesën në Neon për udhëtarin që ka hyrë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

PLOTËSO_ME_REZULTATIN_REAL
