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
| `LICENSE` | Lizenz dieses Projekts (Apache 2.0) |
| `THIRD-PARTY-LICENSES.md`, `LICENSES/` | Lizenzhinweise für die mitgelieferte Fremdbibliothek |

## Lizenzen

Copyright 2026 Europagymnasium Auhof

Der Seriennummer-Scanner steht unter der **Apache License 2.0** (siehe
[`LICENSE`](LICENSE)). Man darf ihn frei nutzen, verändern und weitergeben,
auch an anderen Schulen. Dabei müssen der Lizenztext und die
Copyright-Hinweise erhalten bleiben. Die Software wird ohne Gewährleistung
bereitgestellt.

`html5-qrcode.min.js` stammt aus dem Projekt
[html5-qrcode](https://github.com/mebjas/html5-qrcode) und enthält
[ZXing-js](https://github.com/zxing-js/library). Beide stehen ebenfalls unter
der Apache License 2.0. Details stehen in
[`THIRD-PARTY-LICENSES.md`](THIRD-PARTY-LICENSES.md).

## Betrieb

Die Kamera und der Service Worker funktionieren nur über **HTTPS** (oder
`localhost`). Einfach alle Dateien gemeinsam auf einen Webserver legen und
`index.html` aufrufen.

Nach Änderungen an den App-Dateien die Cache-Version in `sw.js`
(`const CACHE = "seriennr-scanner-vN"`) erhöhen, damit installierte Apps das
Update laden.
