# seriennummern-scanner

Progressive Web App zum Erfassen von Seriennummern per Kamera (Barcode, QR-Code,
Lenovo-Kartonetikett) oder manueller Eingabe. Einträge werden fortlaufend
nummeriert, lokal im Browser gespeichert (localStorage) und können als CSV
exportiert werden.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | gesamte App (Oberfläche + Logik) |
| `html5-qrcode.min.js` | Scan-Bibliothek (Fallback, wenn der Browser keinen `BarcodeDetector` hat, z. B. iOS) |
| `sw.js` | Service Worker für den Offline-Betrieb |
| `manifest.webmanifest` | PWA-Manifest (installierbar am Startbildschirm) |
| `icon-192.png`, `icon-512.png` | App-Icons |

## Betrieb

Die Kamera und der Service Worker funktionieren nur über **HTTPS** (oder
`localhost`). Einfach alle Dateien gemeinsam auf einen Webserver legen und
`index.html` aufrufen.

Nach Änderungen an den App-Dateien die Cache-Version in `sw.js`
(`const CACHE = "seriennr-scanner-vN"`) erhöhen, damit installierte Apps das
Update laden.
