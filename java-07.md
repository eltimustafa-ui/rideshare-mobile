# RideShare — Java 7 · Lista, detajet dhe korrigjimi

## Rasti im

Rasti 2 · Pa vende. Përdor udhëtimin ID 3 (Lipjan → AAB, 07:45), që në të dhënat e provës ka 0 vende.

## Parashikimi

Nga lista, kartela e ID 3 tregon "Vende të lira: 0" dhe butonin "Shiko detajet". Te detajet pres të shoh udhëtimin e zgjedhur (Lipjan → AAB, ora 07:45, vendtakimi) dhe një mesazh që nuk ka vende të lira. Pres që të mos ketë buton që premton rezervim. Për një ID që nuk ekziston (p.sh. 999) pres "Udhëtimi nuk u gjet" dhe lidhje te lista.

## Dy problemet

1. **Detajet nuk tregonin detaje.** `aplikacioni/src/app/udhetimi/[id]/page.tsx` ishte kopje e faqes së kërkesës: `/udhetimi/2` tregonte "Simulim: Në pritje", pa orën, vendtakimin ose vendet, dhe lidhja "Kthehu te detajet" tregonte te vetë faqja.
2. **Nuk kishte rrugë nga detajet te kërkesa demonstrative.** Faqja `/udhetimi/[id]/kerkesa` ekzistonte, por asgjë nuk lidhte me të, dhe me 0 vende nuk kishte asnjë mesazh në faqen e detajeve.

## Korrigjimi

U korrigjua problemi 1 (dhe me të edhe pjesa e problemit 2 te detajet). Skedari `aplikacioni/src/app/udhetimi/[id]/page.tsx` merr ID-në nga adresa, e kërkon udhëtimin në Neon me `gjejUdhetimin` dhe, nëse nuk ekziston, thërret `notFound()`. Tani shfaq rrugën, ID-në, orën, vendtakimin dhe vendet. Me më shumë se 0 vende tregon lidhjen "Provo kërkesën · simulim"; me 0 vende tregon "Nuk ka vende të lira." dhe asnjë buton. Kërkesa mbetet simulim, pa rezervim real. Kontrolli i pronarit dhe `.env` nuk u prekën.

## Provat

### Prova 1 · Rrjedha

Hapat: hapa `/`, pastaj `/udhetimi/1`, pastaj lidhjen "Provo kërkesën · simulim".
Pritshmëria: detajet e udhëtimit 1 dhe, te kërkesa, mesazh simulimi pa rezervim real.
Vëzhgimi: detajet treguan Prishtinë – AAB, 08:00, Stacioni i autobusëve, 2 vende. Kërkesa për ID 2 tregoi "Simulim: Në pritje… nuk është dërguar te shoferi. Ruajtjen dhe konfirmimin real do t'i shtojmë më vonë." Nuk u pretendua rezervim real. Kontrollin e bëra me kërkesa HTTP ndaj serverit lokal dhe lexim të tekstit të faqes, jo me klikim në shfletues.

### Prova 2 · Korrigjimi (pa vende, ID 3)

Hapat: hapa `/udhetimi/3`, pastaj adresën `/udhetimi/3/kerkesa`.
Pritshmëria: detajet e Lipjan → AAB, mesazh pa vende dhe asnjë buton rezervimi.
Vëzhgimi: faqja tregoi Lipjan – AAB, 07:45, Qendra e qytetit, Vende të lira: 0 dhe "Nuk ka vende të lira." pa lidhje kërkese. Hapja e drejtpërdrejtë e kërkesës tregoi "Nuk ka vende të lira." Para korrigjimit, `/udhetimi/2` tregonte faqen e simulimit në vend të detajeve. Kaloi.

### Prova 3 · Hyrje tjetër (ID që nuk ekziston)

Hapat: hapa `/udhetimi/999`.
Pritshmëria: "Udhëtimi nuk u gjet" dhe lidhje te lista.
Vëzhgimi: serveri ktheu HTTP 404, që vjen nga `notFound()` dhe faqja `not-found.tsx`. Nuk e lexova tekstin e faqes në HTML, pasi del në rrjedhën e ngarkimit të Next.js, ndaj nuk e kam verifikuar vetë mesazhin e dukshëm dhe lidhjen te lista. Si kufizim tjetër, ID-ja `abc` nuk u provua veçmas.

## Lidhjet e commit-eve

- Para: https://github.com/eltimustafa-ui/rideshare-mobile/commit/c53408d74e608a9f216a406c3a2b1bbf79a450d6
- Pas: https://github.com/eltimustafa-ui/rideshare-mobile/commit/9632ee4ca02075bcf5e6d26eea784510e6f5bf25

## Ndryshimi i hyrjes

Ndryshova vetëm vlerën e hyrjes: nga ID 1 (2 vende) në ID 3 (0 vende) dhe më pas në ID 999 (nuk ekziston). Nuk ndryshova të dhëna në Neon, as hyrjen me llogari.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Claude Code e bëri gjithë këtë javë: gjeti skedarin e prishur, shkroi korrigjimin, ekzekutoi provat dhe hartoi këtë raport, përfshirë parashikimin. Prandaj parashikimi nuk është shkruar vetëm nga unë, ndryshe nga ç'kërkon udhëzimi. Pa AI, unë duhet ta shpjegoj ndryshimin para kolegut.
