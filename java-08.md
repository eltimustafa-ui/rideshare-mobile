# RideShare — Java 8

## Çfarë ndërtova
Te detajet e udhëtimit shtova zgjedhjen e vendtakimit për Artën. Ajo e shkruan vendtakimin me dorë dhe e konfirmon, ose klikon "Përdor vendndodhjen time" për ta lexuar pozicionin nga telefoni. Teksti që po shkruhet dhe vendtakimi i konfirmuar janë dy vlera të ndara me `useState`, ndaj "Parkingu" pa konfirmim nuk e ndryshon "Biblioteka". Leja kërkohet vetëm pas klikimit. Refuzimi, mbarimi i kohës, pozicioni i padisponueshëm dhe mungesa e mbështetjes kanë secili mesazhin e vet, e mbyllin pritjen dhe e lënë fushën manuale aktive. Ekrani tregon vetëm saktësinë në metra, jo koordinatat. Zgjedhja mbetet lokale dhe Dritoni ende nuk e merr. Shtova edhe faqen `/java-08-test`, që përdor të njëjtin komponent me të dhëna fiktive.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: hapa `http://localhost:3000/java-08-test` dhe nuk klikova asgjë. Pastaj kërkova në kod ku thirret `getCurrentPosition`.
Pritshmëria: gjendja `idle`, pa mesazh dhe pa kërkesë për leje.
Vëzhgimi: gjendja ishte `idle`, statusi bosh. Thirrja e vetme është te `perdorVendndodhjen`, që ekzekutohet vetëm në klikim të butonit. Shfletuesi i provës e kishte lejen tashmë të bllokuar, ndaj dritarja e lejes nuk mund të shfaqej në të; këtë e mbështes te leximi i kodit. Pranimin e lejes e provova me `getCurrentPosition` të simuluar (saktësi 37 m): statusi kaloi nga `loading` në `success` dhe u shfaq "Saktësia rreth 37 m". Pranimi real në telefon nuk është pjesë e kësaj prove.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: me lejen e bllokuar në shfletues, klikova "Përdor vendndodhjen time". Pastaj, me thirrjen e simuluar, provova `code 1`, shkrova "Parkingu" dhe konfirmova. Si simulim provova edhe `code 3` (timeout), `code 2` dhe mungesën e `navigator.geolocation`.
Pritshmëria: pritja mbaron, del mesazhi përkatës dhe vendtakimi manual konfirmohet.
Vëzhgimi: refuzimi real dha gjendjen `denied` dhe "Leja u refuzua. Shkruaj vendtakimin vetë.", me butonin sërish aktiv. "Parkingu" u konfirmua. Simulim i timeout-it: gjendja `timeout`, "Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.", pastaj "Biblioteka" u konfirmua. `code 2` dhe mungesa e mbështetjes dhanë gjendjen `unavailable` me mesazhe të ndryshme, dhe zgjedhja manuale punoi. Vonesën reale nuk e provova.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: para commit-it kontrollova listën e skedarëve me `git status`, kërkova numra në formë koordinatash te `aplikacioni/src` dhe `mobile-week08.json`, dhe kontrollova që `.env.local` injorohet.
Pritshmëria: pa koordinata reale, adresa dhe sekrete.
Vëzhgimi: kërkimi nuk gjeti koordinata, `.env.local` është i injoruar dhe nuk hyn në commit. Vlera 37 m është simuluar. Kodi nuk i ruan as nuk i shfaq koordinatat.

## Ku gjendet puna
- `aplikacioni/src/components/Vendtakimi.tsx` — komponenti i klientit
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — detajet e udhëtimit, ku përdoret komponenti
- `aplikacioni/src/app/java-08-test/page.tsx` — faqja e provës
- `aplikacioni/src/app/globals.css` — stili i fushës dhe butonave
- `mobile-week08.json` — konfigurimi i testit

Demonstrimi: https://rideshare-mobile-lemon.vercel.app/java-08-test

## Çfarë mbetet për përmirësim
Vendtakimi mbahet vetëm në gjendjen lokale të React-it, ndaj humbet pas rifreskimit dhe Dritoni nuk e sheh. Hapi i ardhshëm është ta ruajmë në server dhe t'ia dërgojmë shoferit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Claude Code e bëri këtë javë: shkroi komponentin dhe faqen e provës, ekzekutoi provat në localhost dhe hartoi këtë raport, përfshirë parashikimin më poshtë. Provat me kod të simuluar dhe prova me lejen e bllokuar i kreu Claude Code në shfletuesin e vet. Unë duhet ta shpjegoj dhe ta ndryshoj kodin vetë në klasë.

## Prova me një hyrje të re
Prova nuk u bë me kolegun: e ekzekutoi Claude Code.
- Hyrja që provova: tekst me vetëm hapësira, pasi "Biblioteka" ishte konfirmuar.
- Parashikimi im para klikimit: del mesazhi i gabimit dhe vendtakimi i konfirmuar mbetet "Biblioteka".
- Çfarë pashë realisht: "Shkruaj vendtakimin para se ta konfirmosh." dhe vendtakimi i konfirmuar mbeti "Biblioteka".
- Skedari dhe funksioni që e shpjegojnë: `aplikacioni/src/components/Vendtakimi.tsx`, funksioni `konfirmo`. `trim()` e kthen tekstin në bosh dhe funksioni del para se të thërrasë `setVendtakimi`.
- Çfarë kuptova ose korrigjova: gabimi mbetej në ekran edhe pasi fillonte shkrimi i ri, ndaj e pastrova te `onChange` i fushës.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
