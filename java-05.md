# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Shtova hyrjen me GitHub (NextAuth, OAuth) dhe një panel te `/panel`. Identiteti është ID-ja e llogarisë GitHub që vjen nga sesioni i verifikuar. Roli (`udhetar` ose `shofer`) ruhet në tabelën `profilet` në Neon dhe çdo hyrje e re fillon si udhëtar; roli nuk zgjidhet nga formulari. Pronësia është kolona `shofer_id` te `udhetimet`: vetëm shoferi që zotëron një udhëtim mund t'ia ndryshojë orën. Kontrolli bëhet në server, te `ndryshoOren` në `src/lib/lejet.ts`, ndaj ndryshimi i ID-së në formular nuk e kalon kontrollin. Skedarët e rinj janë `src/lib/auth.ts`, `src/lib/lejet.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/components/Hyrja.tsx`, `src/app/panel/page.tsx`, `src/app/panel/actions.ts` dhe `schema-java05.sql`.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Hapa `/panel` pa hyrë dhe paneli më kërkoi të hyj me GitHub. Pas **Hyr me GitHub** paneli tregoi emrin tim (`eltimustafa-ui`), ID-në GitHub dhe rolin `udhetar`. E rifreskova faqen dhe emri e roli mbetën. Pastaj klikova **Dil** dhe paneli më kërkoi hyrje përsëri.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Në Neon e bëra llogarinë time shofer dhe pronare të udhëtimit ID 2. Në panel u shfaq roli `shofer` dhe formulari. Vendosa orën 08:25 dhe klikova **Ruaj orën**. Paneli tregoi "Ora u ruajt me sukses", dhe lista, detajet e ID 2 dhe Neon treguan 08:25. Pastaj e ktheva orën në 08:15.

### Prova 3: Veprimi pa leje refuzohet

Në DevTools e ndryshova fushën e fshehur `id` nga 2 në 1 dhe klikova **Ruaj orën**. Paneli tregoi "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi." Në Neon ID 1 mbeti 08:00 dhe pronari i tij mbeti `DEMO-SHOFER-2`. Pas provës ID 2 ishte 08:15.

## Ku gjendet puna

Repository: https://github.com/eltimustafa-ui/rideshare-mobile. Kodi është në `aplikacioni/`, ndërsa skedarët e rinj janë ata të listuar më sipër.

## Çfarë mbetet për përmirësim

Kërkesa për vend është ende simulim: nuk ruhet në databazë dhe nuk njoftohet shoferi. Më pas do ta ruaj kërkesën në Neon për udhëtarin që ka hyrë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora Claude Code për të shkruar skedarët e hyrjes dhe të lejeve sipas kodit të ushtrimit, për t'i ndërtuar dhe për të kontrolluar që databaza ka gjendjen e pritur. Aplikacionin OAuth në GitHub, vlerat private te `.env.local`, SQL-në në Neon dhe tri provat i bëra vetë.
