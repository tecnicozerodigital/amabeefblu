# Amabeef — codice del sito

Sorgenti Vue 3, asset pubblici e configurazione Nginx del sito amabeefrestaurant.it. Il pacchetto contiene i file correnti del progetto alla data del 30 settembre 2026.

## Installazione e build

Usare Node.js 22 e npm. Le dipendenze sono fissate nel file `package-lock.json`.

```sh
PUPPETEER_SKIP_DOWNLOAD=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci --legacy-peer-deps
npm run build
```

La build statica viene generata in `dist/`. Il prerender locale e l'analisi del bundle sono disattivati in `.env.production` (`RENDER=false`, `ANALYZE=false`). Non è richiesto il download di Chromium.

Per lo sviluppo locale:

```sh
npm run serve
```

Per un'anteprima Node della build: `npm run start:server` (porta 3000, modificabile con `PORT`). Questo server offre il fallback SPA; le regole HTTP di produzione descritte sotto sono nella configurazione Nginx.

## Pubblicazione con Docker / Nginx

```sh
docker build -t amabeef-site .
docker run --rm -p 8080:80 amabeef-site
```

Il Dockerfile compila il sito e serve `dist/` tramite Nginx. Per un altro hosting pubblicare `dist/`, configurare il fallback SPA e riportare le regole in `.nginx/nginx.conf`. Dominio, certificato HTTPS e DNS vanno configurati sul nuovo servizio.

La configurazione conserva i reindirizzamenti 301 dei vecchi menu verso gli URL permanenti, le risposte 410 delle pagine dismesse e le intestazioni di cache/sicurezza. Gli URL permanenti dei PDF sono:

- `/files/amabeef-cadorago-como-menu-ristorante.pdf`
- `/files/amabeef-cadorago-como-menu-hamburger.pdf`

Per aggiornare il menu sostituire il corrispondente file in `public/files/`, preservandone il nome. Sono inclusi anche gli altri PDF e asset pubblici del sito.

## Servizi esterni

- Google Analytics: il codice pubblico usa la proprietà `G-D0LD6J8JQR`; verificare accessi, titolarità e configurazione del consenso con il cliente.
- Prenotazioni: i pulsanti collegano `https://amabeef.plateform.app`; verificare la gestione dell'account con il cliente.
- Prerender: la configurazione Nginx consegnata serve il sito statico senza il servizio esterno. Nel server Node l'integrazione Prerex è opzionale e si attiva solo se il nuovo gestore imposta `PREREX_API_KEY` nel proprio ambiente. Non sono incluse chiavi. Per i motori di ricerca valutare e configurare il servizio di rendering sul nuovo hosting.

Il pacchetto non include account, credenziali, database, servizi email o accessi alle piattaforme esterne.
