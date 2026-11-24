// Service Worker: macht die App offline nutzbar.
// Strategie: App-Dateien beim Installieren cachen (cache-first),
// alles andere (z. B. die Scan-Bibliothek vom CDN) zur Laufzeit nachcachen.

const CACHE = "seriennr-scanner-v7";

// Lokale App-Dateien, die fest mitgecacht werden.
const APP_DATEIEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  // Scan-Bibliothek lokal mitcachen, damit Scannen auch offline geht.
  "./html5-qrcode.min.js",
];

// Installieren: App-Dateien in den Cache legen.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Einzeln hinzufügen, damit ein fehlschlagender CDN-Eintrag
      // nicht die ganze Installation abbricht.
      Promise.all(
        APP_DATEIEN.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => {})
        )
      )
    )
  );
  self.skipWaiting();
});

// Aktivieren: alte Caches aufräumen.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Anfragen beantworten: erst Cache, dann Netz (und Antwort nachcachen).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((treffer) => {
      if (treffer) return treffer;
      return fetch(event.request)
        .then((antwort) => {
          // Erfolgreiche Antworten zur Laufzeit in den Cache aufnehmen.
          const kopie = antwort.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, kopie).catch(() => {}));
          return antwort;
        })
        .catch(() => treffer); // offline und nicht im Cache -> nichts
    })
  );
});
