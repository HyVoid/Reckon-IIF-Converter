[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Automatisieren Sie CRM-zu-Reckon-Rechnungsimporte mit einem wiederverwendbaren Excel-basierten Framework für Validierung und IIF-Generierung

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support%20%2B%20Data%20Transformation-orange.svg)

**Verwandeln Sie CRM-Rechnungsexporte in validierte, importfertige Rechnungsstapel für Reckon Accounting—ohne Programmierung, ohne manuelle Neueingabe und ohne Verständnis für IIF-Dateistrukturen.**

**Keine Registrierung. Keine Installation. Kostenlos in Ihrem Browser.**

Testen Sie die Browser-Version kostenlos. Wenn Sie die Excel-Version benötigen, können Sie sie mit einer 30-tägigen Geld-zurück-Garantie ohne Rückfragen erwerben.
>
> 🌐 **Im Browser öffnen** → [Interaktive HTML-Version](https://hyvoid.github.io/Reckon-IIF-Converter/)
> 📥 **Excel herunterladen** → Excel-Arbeitsmappen-Version
>
> Sowohl als browserbasiertes HTML als auch im Microsoft Excel-Format verfügbar.

---

## Was es Ihnen hilft zu verfolgen

* CRM-Rechnungsdatensätze, die nicht in Reckon importiert werden können, bevor sie Buchhaltungsfehler verursachen.
* Abweichungen bei Kunden-, Steuercode-, Artikel- und Kontenzuordnungen zwischen Systemen.
* Bereitschaftsstatus des Rechnungsstapel-Imports und Risiko des Importfehlers.
* Doppelte Rechnungen und fehlende buchhalterische Stammdaten.
* Rechnungsdurchsatz, Ausnahmeraten und Validierungserfolgsraten.
* Gesamtrechnungswert, der in einem einzigen Stapel zur Finanzbuchung vorbereitet wird.

---

# Warum ich dies gebaut habe

Die meisten Unternehmen gehen davon aus, dass ihr Problem darin besteht, "eine IIF-Datei zu erstellen".

In der Praxis ist das eigentliche Problem ein anderes.

Der operative Fehler tritt auf, weil Rechnungsinformationen bereits in einem CRM existieren, Finanzteams dieselben Informationen jedoch manuell in der Buchhaltungssoftware neu erstellen müssen. Jede Rechnung erfordert das erneute Eintippen von Kunden, Produkten, Steuercodes, Konten und Beträgen. Mit wachsendem Rechnungsvolumen skaliert der Buchhaltungsaufwand fast linear.

Der zweite Fehler ist subtiler: Unternehmen entdecken Importfehler oft erst nach dem Versuch, Daten in das Buchhaltungssystem zu laden. Zu diesem Punkt müssen Buchhalter untersuchen, welcher Kunde, Steuercode, welches Konto oder Datum den Fehler verursacht hat.

Ich habe dieses Tool gebaut, weil ich wiederholt dasselbe Muster beobachtet habe:

```text
CRM Export
     ↓
Manual Cleanup
     ↓
Manual Mapping
     ↓
Import Attempt
     ↓
Import Failure
     ↓
Manual Investigation
     ↓
Repeat
```

Das Problem ist nicht die Buchhaltungssoftware. Das Problem ist die fehlende Übersetzungsschicht zwischen operativen Systemen und Finanzsystemen.

Zum Beispiel:

### Vorher

Ein CRM-Export enthält:

| Kunde | Produkt   | Steuer | Betrag |
| ----- | --------- | ------ | ------ |
| ABC Pty | Service A | VAT | $1,500 |

Reckon erwartet:

| Kunde    | Artikel    | Steuercode | Konto |
| --------- | ------- | --------- | ------- |
| ABC PTY LTD | SERV001 | GST | 4-1000 |

Der Import scheitert, weil die Strukturen inkompatibel sind.

### Nachher

Die Arbeitsmappe automatisch:

* ordnet Kundennamen zu,
* übersetzt Produktcodes,
* validiert Steuercodes,
* verifiziert Kontenzuordnungen,
* generiert gültige IIF-Transaktionsstrukturen.

Anstatt eine einmalige Tabelle zu bauen, war das Ziel, ein wiederholbares Reasoning-Framework zu produktisieren:

> "How can operational invoice data be transformed into accounting-compliant transaction data with minimal human intervention?"

---

## Häufige Rechnungsimport-Probleme, die dies löst

| Problem                            | Ohne dieses Tool                              | Mit diesem Tool                           |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Doppelte Rechnungserfassung            | Vertrieb und Finanzen erfassen Rechnungen manuell | CRM-Daten einmal erfasst und wiederverwendet |
| Abweichungen bei Kundenstammdaten         | Importfehler nach Upload entdeckt        | Kundenvalidierung erfolgt vor dem Import |
| Inkonsistenzen bei Steuercodes           | Falsche Steuerberichte und abgelehnte Importe   | Steuerzuordnungsregeln automatisch erzwungen |
| Fehler bei der Kontokodierung              | Transaktionen auf falsche Konten gebucht           | Hauptbuchvalidierung vor dem Export durchgeführt |
| Unterschiede in der Rechnungspositionsstruktur | Umfangreiche manuelle Neuformatierung                  | Automatische Rechnung-zu-IIF-Transformation |
| Wiederholte Stapelvorbereitungsarbeit    | Jeder Importstapel manuell neu erstellt            | Standardisierter wiederverwendbarer Import-Workflow |

---

## Für wen dies ist

Dieses Tool wurde entwickelt für:

* Kleine und mittlere Unternehmen, die CRM-Systeme neben Reckon Accounting einsetzen.
* Finanzmanager, die wiederkehrende Rechnungsstapel verarbeiten.
* Buchhalter, die für Importvalidierung und Debitorenbuchhaltung zuständig sind.
* Berater, die leichtgewichtige Finanzoperations-Workflows aufbauen.
* Unternehmen, die kostengünstige Automatisierung von Buchhaltungsprozessen anstreben.

Dieses Tool wurde nicht entwickelt für:

* Echtzeit-ERP-Synchronisation.
* Middleware-Plattformen für Unternehmen.
* Vollständige bidirektionale Buchhaltungsintegrationen.
* Integrationsarchitekturen auf Datenbankebene.

Keine Tabellenkalkulations-Expertise erforderlich. Öffnen Sie die Browser-Version und beginnen Sie sofort mit der Verarbeitung von Rechnungsstapeln.

---

## Über mich

Ich baue leichtgewichtige Entscheidungsunterstützungs- und Betriebsanalyse-Tools für Situationen, in denen zu viele bewegliche Teile vorhanden sind, um sie allein im Gedächtnis zuverlässig zu verwalten.

Die zentrale Frage hinter jedem Tool ist:

> **"What information needs to exist in one place so the next operational decision can be made confidently?"**

Der Reckon Invoice Import Builder ist ein Beispiel für diesen Ansatz: ein wiederverwendbares Analyse-Framework, das die Vorbereitung des Rechnungsimports von einer repetitiven Verwaltungsaufgabe in einen standardisierten operativen Prozess verwandelt.

---

## Technische Details

<details>
<summary>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</summary>

---

### Arbeitsmappen-Architektur

| Ebene          | Arbeitsblatt         | Funktion                                    |
| -------------- | ----------------- | ------------------------------------------- |
| Input          | CRM Export Paste  | Rohimport von Rechnungen                          |
| Master Data    | Mapping Tables    | Kunden-, Artikel-, Steuer-, Hauptbuchzuordnungen            |
| Validation     | Validation Engine | Regelprüfung und Ausnahmeerkennung       |
| Transformation | IIF Generator     | Generierung von Reckon-Transaktionen               |
| Output         | Export File       | Erstellung der finalen Importdatei                  |
| Monitoring     | Dashboard         | Betriebskennzahlen und Ausnahmeberichte |

#### Datenfluss

```text
CRM Export
        ↓
Field Standardization
        ↓
Master Data Mapping
        ↓
Validation Engine
        ↓
Error Detection
        ↓
IIF Transaction Builder
        ↓
Export Output
        ↓
Reckon Accounting Import
```

---

### Drei Fallen, die selbst erfahrene Finanzteams fangen

#### Falle 1 — Annahme, Kundennamen seien Identifikatoren

Ein Finanzteam importiert Rechnungen mit Kundenanzeigenamen.

Die Annahme:

```text
CRM Customer = Accounting Customer
```

Realität:

| CRM     | Reckon      |
| ------- | ----------- |
| ABC Pty | ABC PTY LTD |
| XYZ Ltd | XYZ LIMITED |

Ergebnis:

```text
Import Failure Rate: 18%
```

Der Denkfehler ist die Annahme, dass Bezeichnungen Identifikatoren sind.

Korrekter Ansatz:

```text
CRM Customer
      ↓
Customer Mapping Table
      ↓
Reckon Customer ID
```

Korrektes Ergebnis:

```text
Import Failure Rate: <1%
```

<details>
<summary>Formellogik</summary>

```excel
=XLOOKUP(
    CRM_Customer,
    Customer_Map[CRM],
    Customer_Map[Reckon],
    "ERROR"
)
```

</details>

---

#### Falle 2 — Annahme, Steuercodes übersetzen sich automatisch

Entscheidung:

```text
Use CRM tax values directly.
```

Fehlerhafte Annahme:

```text
VAT = GST
```

Realität:

| CRM-Steuer | Reckon-Steuer |
| --------- | ------------ |
| VAT       | GST          |
| ZERO      | FRE          |
| EXEMPT    | N-T          |

Dies führt zu ungültiger Steuerberichterstattung.

Korrekter Ansatz:

```text
Tax Mapping Table
        ↓
Validation Rules
        ↓
Accounting Tax Code
```

Korrektes Ergebnis:

* konforme Steuerzuordnung,
* reduziertes Risiko der Importablehnung,
* konsistente Berichterstattung.

<details>
<summary>Formellogik</summary>

```excel
=IFERROR(
    XLOOKUP(
        CRM_Tax,
        Tax_Map[CRM],
        Tax_Map[Reckon]
    ),
    "ERROR"
)
```

</details>

---

#### Falle 3 — Rechnungszeilen als Rechnungsdokumente behandeln

Entscheidung:

```text
Export rows directly.
```

Fehlerhafte Annahme:

```text
1 Row = 1 Invoice
```

Realität:

```text
Invoice Header
      ↓
Multiple Invoice Lines
      ↓
TRNS/SPL/ENDTRNS Structure
```

Ohne Umstrukturierung:

```text
Import Failure
```

Korrekter Ansatz:

```text
Invoice Grouping
       ↓
Header Generation
       ↓
Line Generation
       ↓
IIF Assembly
```

Korrektes Ergebnis:

```text
100% Reckon-compatible transaction structures
```

<details>
<summary>Formellogik</summary>

```excel
=COUNTIFS(
    InvoiceNo,
    CurrentInvoice
)
```

</details>

---

### Beispielszenario

Ein Unternehmen exportiert 350 Rechnungen aus seinem CRM-System.

Roh-Export:

| Rechnung | Kunde | Produkt   | Steuer | Betrag |
| ------- | ------ | --------- | ------- | ------ |
| INV1001 | ABC Pty | Service A | VAT | 1500 |
| INV1001 | ABC Pty | Service B | VAT | 700 |

Die Arbeitsmappe führt aus:

#### Schritt 1 — Kundenvalidierung

```text
ABC Pty
    ↓
ABC PTY LTD
```

#### Schritt 2 — Produktzuordnung

```text
Service A
      ↓
SERV001

Service B
      ↓
SERV002
```

#### Schritt 3 — Steuerübersetzung

```text
VAT
 ↓
GST
```

#### Schritt 4 — Transaktionsaufbau

```text
TRNS
SPL
SPL
ENDTRNS
```

Endergebnis:

| Kennzahl       | Wert       |
| ------------- | ----------- |
| Rechnungen     | 350         |
| Gesamtwert     | AUD 486,000 |
| Fehler         | 7           |
| Warnungen      | 13          |
| Erfolgsquote   | 98.0%       |

Operative Implikation:

Anstatt 350 Rechnungen manuell in Reckon neu aufzubauen, lösen Finanzmitarbeiter nur die 20 identifizierten Ausnahmen.

---

### Formelreferenz

<details>
<summary>Zuordnungsformeln</summary>

| Zweck             | Formel  |
| ----------------- | -------- |
| Kundenzuordnung   | XLOOKUP  |
| Produktzuordnung  | XLOOKUP  |
| Steuerzuordnung   | XLOOKUP  |
| Hauptbuchzuordnung | XLOOKUP  |
| Duplikaterkennung | COUNTIFS |

</details>

<details>
<summary>Validierungsformeln</summary>

| Zweck                     | Formel  |
| ------------------------- | -------- |
| Prüfung auf fehlende Werte | IF       |
| Fehlerbehandlung          | IFERROR  |
| Datumsvalidierung         | ISNUMBER |
| Erkennung doppelter Rechnungen | COUNTIFS |
| Ausnahmeklassifizierung   | IFS      |

</details>

<details>
<summary>IIF-Generierungsformeln</summary>

| Zweck              | Formel  |
| ------------------ | -------- |
| Transaktionsgruppierung | UNIQUE   |
| Kopfgenerierung    | TEXTJOIN |
| Positionsaggregation | SUMIFS   |
| Datensatzsequenzierung | SEQUENCE |

</details>

---

### Validierungsregeln

| Feld          | Regel                            | Fehlerverhalten |
| -------------- | ------------------------------- | -------------- |
| Kunde         | Muss in Zuordnungstabelle existieren     | ERROR          |
| Produkt       | Muss in Artikeltabelle existieren        | ERROR          |
| Steuercode    | Muss auf gültigen Reckon-Code abgebildet werden   | ERROR          |
| Hauptbuchkonto | Muss im Kontenplan existieren | ERROR          |
| Rechnungsnummer | Muss eindeutig sein                  | WARNING        |
| Rechnungsdatum | Muss gültiges Datum sein              | ERROR          |
| Menge         | Muss positiv sein                | ERROR          |
| Betrag        | Muss numerisch sein                 | ERROR          |
| Rechnungsgesamt | Muss ausgeglichen sein                    | ERROR          |

</details>

---

## Weitere Tools dieser Serie

* **Inventory Planning & Replenishment Decision Engine** — Bedarfsprognose und Nachschubanalyse.
* **Shopify/Etsy VAT Compliance Dashboard** — Marktplatz-Steuerberechnung und Unterstützung bei der Abgabe.
* **Project Cost Allocation Control Center** — Arbeitskostenzuordnung und Rentabilitätsanalyse.
* **Marketing Attribution Audit Framework** — Validierung von Werbeattribution und Budgetoptimierung.
* **Multi-Entity Logistics Operations Console** — operative Transparenz über Lagernetzwerke.

Weitere Tools verfügbar über GitHub-Repository und Vertriebskatalog.

---

## License

Dieses Projekt ist lizenziert unter der **Apache License 2.0**.

Siehe die LICENSE-Datei für Details.
