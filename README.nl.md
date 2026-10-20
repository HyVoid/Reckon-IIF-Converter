[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Automatiseer CRM-naar-Reckon-factuurimports met een herbruikbaar op Excel gebaseerd raamwerk voor validatie en IIF-generatie

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support%20%2B%20Data%20Transformation-orange.svg)

**Zet CRM-factuurexporten om in gevalideerde, importklare Reckon Accounting-factuurbatches—zonder programmeren, zonder handmatig overtypen, en zonder de structuur van IIF-bestanden te hoeven begrijpen.**

**Geen registratie. Geen installatie. Gratis in je browser.**

Probeer de browserversie gratis. Heb je de Excel-versie nodig, dan kun je die kopen met een 30-dagen geld-terug-garantie zonder vragen te stellen.
>
> 🌐 **Openen in browser** → [Interactieve HTML-versie](https://hyvoid.github.io/Reckon-IIF-Converter/)
> 📥 **Excel downloaden** → Excel-werkmappenversie
>
> Beschikbaar in zowel browsergebaseerd HTML- als Microsoft Excel-formaat.

---

## Wat het je helpt bijhouden

* CRM-factuurrecords die niet in Reckon kunnen worden geïmporteerd voordat ze boekhoudfouten veroorzaken.
* Klant-, belastingcode-, artikel- en rekeningtoewijzingsmismatches tussen systemen.
* Gereedheidsstatus van factuurbatchimports en risico op importmislukking.
* Dubbele facturen en ontbrekende boekhoudkundige stamgegevens.
* Factuurverwerkingsdoorvoer, uitzonderingspercentages en validatiesuccespercentages.
* Totale factuurwaarde die in één batch voor financiële boeking wordt voorbereid.

---

## Waarom ik dit heb gebouwd

De meeste bedrijven nemen aan dat hun probleem is "een IIF-bestand maken".

In de praktijk is het echte probleem anders.

De operationele mislukking treedt op omdat factuurinformatie al in een CRM bestaat, maar financiële teams dezelfde informatie handmatig in de boekhoudsoftware opnieuw moeten aanmaken. Elke factuur vereist het overtypen van klanten, producten, belastingcodes, rekeningen en bedragen. Naarmate het factuurvolume groeit, schaalt de boekhoudinspanning bijna lineair.

De tweede mislukking is subtieler: bedrijven ontdekken importfouten vaak pas na een poging om gegevens in het boekhoudsysteem te laden. Op dat punt moeten boekhouders onderzoeken welke klant, belastingcode, rekening of datum de mislukking heeft veroorzaakt.

Ik heb deze tool gebouwd omdat ik herhaaldelijk hetzelfde patroon zag:

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

Het probleem is niet de boekhoudsoftware. Het probleem is de ontbrekende vertaallaag tussen operationele systemen en financiële systemen.

Bijvoorbeeld:

### Voor

Een CRM-export bevat:

| Klant | Product   | Belasting | Bedrag |
| ----- | --------- | --------- | ------ |
| ABC Pty | Service A | VAT | $1,500 |

Reckon verwacht:

| Klant    | Artikel    | Belastingcode | Rekening |
| --------- | ------- | --------- | ------- |
| ABC PTY LTD | SERV001 | GST | 4-1000 |

De import mislukt omdat de structuren incompatibel zijn.

### Na

De werkmappen doet automatisch het volgende:

* wijst klantnamen toe,
* vertaalt productcodes,
* valideert belastingcodes,
* verifieert rekeningtoewijzingen,
* genereert geldige IIF-transactiestructuren.

In plaats van een eenmalig spreadsheet te bouwen, was het doel om een herhaalbaar redeneerraamwerk te productiseren:

> "How can operational invoice data be transformed into accounting-compliant transaction data with minimal human intervention?"

---

## Veelvoorkomende factuurimportproblemen die dit oplost

| Probleem                            | Zonder deze tool                              | Met deze tool                           |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Dubbele factuurinvoer            | Verkoop en financiën voeren facturen handmatig in | CRM-gegevens één keer ingevoerd en hergebruikt |
| Klantstamgegevens-mismatches         | Importmislukkingen na upload ontdekt        | Klantvalidatie vindt plaats vóór import |
| Belastingcode-inconsistenties           | Onjuiste belastingrapportage en geweigerde imports   | Belastingtoewijzingsregels automatisch afgedwongen |
| Fouten in rekeningcodering              | Transacties geboekt op verkeerde grootboeken           | Grootboekvalidatie uitgevoerd vóór export |
| Verschillen in factuurregelstructuur | Uitgebreide handmatige herformattering                  | Automatische factuur-naar-IIF-transformatie |
| Herhaaldelijk batchvoorbereidingswerk    | Elke importbatch handmatig herbouwd            | Gestandaardiseerde herbruikbare importworkflow |

---

## Voor wie dit is

Deze tool is ontworpen voor:

* Kleine en middelgrote bedrijven die CRM-systemen naast Reckon Accounting gebruiken.
* Financiële managers die terugkerende factuurbatches verwerken.
* Boekhouders die verantwoordelijk zijn voor importvalidatie en debiteurenverwerking.
* Consultants die lichtgewicht financiële operations-workflows bouwen.
* Bedrijven die op zoek zijn naar kostengunstige automatisering van boekhoudprocessen.

Deze tool is niet ontworpen voor:

* Realtime ERP-synchronisatie.
* Middlewareplatforms op ondernemingsniveau.
* Volledige bidirectionele boekhoudintegraties.
* Integratiearchitecturen op databaseniveau.

Geen spreadsheet-expertise vereist. Open de browserversie en begin direct met het verwerken van factuurbatches.

---

## Over

Ik bouw lichtgewicht tools voor besluitondersteuning en operationele analyse voor situaties waarin er te veel bewegende delen zijn om ze betrouwbaar in het geheugen alleen te beheren.

De centrale vraag achter elke tool is:

> **"What information needs to exist in one place so the next operational decision can be made confidently?"**

De Reckon Invoice Import Builder is één voorbeeld van deze benadering: een herbruikbaar analytisch raamwerk dat de voorbereiding van factuurimports van een repetitieve administratieve taak in een gestandaardiseerd operationeel proces verandert.

---

## Technische details

<details>
<summary>Voor technische reviewers, Excel-beoefenaars en medewerkers</summary>

---

### Werkmappenarchitectuur

| Laag          | Werkblad         | Functie                                    |
| -------------- | ----------------- | ------------------------------------------- |
| Input          | CRM Export Paste  | Ruwe factuurimport                          |
| Master Data    | Mapping Tables    | Klant-, artikel-, belasting-, grootboektoewijzingen            |
| Validation     | Validation Engine | Regelcontrole en uitzonderingsdetectie       |
| Transformation | IIF Generator     | Generatie van Reckon-transacties               |
| Output         | Export File       | Creatie van het finale importbestand                  |
| Monitoring     | Dashboard         | Operationele metrics en uitzonderingsrapportage |

#### Gegevensstroom

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

### Drie valkuilen die zelfs ervaren financiële teams vangen

#### Valkuil 1 — Aannemen dat klantnamen identifiers zijn

Een financiëel team importeert facturen met behulp van klantweergavenamen.

De aanname:

```text
CRM Customer = Accounting Customer
```

De werkelijkheid:

| CRM     | Reckon      |
| ------- | ----------- |
| ABC Pty | ABC PTY LTD |
| XYZ Ltd | XYZ LIMITED |

Resultaat:

```text
Import Failure Rate: 18%
```

De redeneerfout is het aannemen dat labels identifiers zijn.

Juiste aanpak:

```text
CRM Customer
      ↓
Customer Mapping Table
      ↓
Reckon Customer ID
```

Juiste uitkomst:

```text
Import Failure Rate: <1%
```

<details>
<summary>Formulelogica</summary>

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

#### Valkuil 2 — Aannemen dat belastingcodes automatisch vertalen

Beslissing:

```text
Use CRM tax values directly.
```

Foutieve aanname:

```text
VAT = GST
```

De werkelijkheid:

| CRM-belasting | Reckon-belasting |
| --------- | ------------ |
| VAT       | GST          |
| ZERO      | FRE          |
| EXEMPT    | N-T          |

Dit levert ongeldige belastingrapportage op.

Juiste aanpak:

```text
Tax Mapping Table
        ↓
Validation Rules
        ↓
Accounting Tax Code
```

Juiste uitkomst:

* conforme belastingtoewijzing,
* verminderd risico op importweigering,
* consistente rapportage.

<details>
<summary>Formulelogica</summary>

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

#### Valkuil 3 — Factuurregels behandelen als factuurdocumenten

Beslissing:

```text
Export rows directly.
```

Foutieve aanname:

```text
1 Row = 1 Invoice
```

De werkelijkheid:

```text
Invoice Header
      ↓
Multiple Invoice Lines
      ↓
TRNS/SPL/ENDTRNS Structure
```

Zonder herstructurering:

```text
Import Failure
```

Juiste aanpak:

```text
Invoice Grouping
       ↓
Header Generation
       ↓
Line Generation
       ↓
IIF Assembly
```

Juiste uitkomst:

```text
100% Reckon-compatible transaction structures
```

<details>
<summary>Formulelogica</summary>

```excel
=COUNTIFS(
    InvoiceNo,
    CurrentInvoice
)
```

</details>

---

### Voorbeeldscenario

Een bedrijf exporteert 350 facturen uit zijn CRM-systeem.

Ruwe export:

| Factuur | Klant | Product   | Belasting | Bedrag |
| ------- | ------ | --------- | --------- | ------ |
| INV1001 | ABC Pty | Service A | VAT | 1500 |
| INV1001 | ABC Pty | Service B | VAT | 700 |

De werkmappen voert uit:

#### Stap 1 — Klantvalidatie

```text
ABC Pty
    ↓
ABC PTY LTD
```

#### Stap 2 — Producttoewijzing

```text
Service A
      ↓
SERV001

Service B
      ↓
SERV002
```

#### Stap 3 — Belastingvertaling

```text
VAT
 ↓
GST
```

#### Stap 4 — Transactieopbouw

```text
TRNS
SPL
SPL
ENDTRNS
```

Eindresultaat:

| Metric       | Waarde       |
| ------------- | ----------- |
| Facturen      | 350         |
| Totale waarde | AUD 486,000 |
| Fouten        | 7           |
| Waarschuwingen | 13          |
| Succespercentage | 98.0%       |

Operationele implicatie:

In plaats van 350 facturen handmatig in Reckon opnieuw op te bouwen, lossen financiële medewerkers alleen de 20 geïdentificeerde uitzonderingen op.

---

### Formulereferentie

<details>
<summary>Toewijzingsformules</summary>

| Doel             | Formule  |
| ----------------- | -------- |
| Klanttoewijzing   | XLOOKUP  |
| Producttoewijzing | XLOOKUP  |
| Belastingtoewijzing | XLOOKUP  |
| Grootboektoewijzing | XLOOKUP  |
| Duplicaatdetectie | COUNTIFS |

</details>

<details>
<summary>Validatieformules</summary>

| Doel                     | Formule  |
| ------------------------- | -------- |
| Controle op ontbrekende waarden | IF       |
| Foutafhandeling          | IFERROR  |
| Datumvalidatie           | ISNUMBER |
| Detectie van dubbele facturen | COUNTIFS |
| Uitzonderingsclassificatie | IFS      |

</details>

<details>
<summary>IIF-generatieformules</summary>

| Doel              | Formule  |
| ------------------ | -------- |
| Transactiegroepering | UNIQUE   |
| Kopgeneratie       | TEXTJOIN |
| Regelaggregatie    | SUMIFS   |
| Recordsequencing   | SEQUENCE |

</details>

---

### Validatieregels

| Veld          | Regel                            | Foutgedrag |
| -------------- | ------------------------------- | -------------- |
| Klant         | Moet bestaan in toewijzingstabel     | ERROR          |
| Product       | Moet bestaan in artikeltabel        | ERROR          |
| Belastingcode | Moet toegewezen zijn aan geldige Reckon-code   | ERROR          |
| Grootboekrekening | Moet bestaan in rekenschema | ERROR          |
| Factuurnummer | Moet uniek zijn                  | WARNING        |
| Factuurdatum  | Moet een geldige datum zijn              | ERROR          |
| Hoeveelheid   | Moet positief zijn                | ERROR          |
| Bedrag        | Moet numeriek zijn                 | ERROR          |
| Factuurtotaal | Moet in balans zijn                    | ERROR          |

</details>

---

## Andere tools in deze serie

* **Inventory Planning & Replenishment Decision Engine** — vraagvoorspelling en aanvullingsanalyse.
* **Shopify/Etsy VAT Compliance Dashboard** — marktplaats-belastingberekening en ondersteuning bij aangifte.
* **Project Cost Allocation Control Center** — arbeidskostentoewijzing en rentabiliteitsanalyse.
* **Marketing Attribution Audit Framework** — validatie van reclame-attributie en budgetoptimalisatie.
* **Multi-Entity Logistics Operations Console** — operationeel zicht over magazijnnetwerken.

Meer tools beschikbaar via GitHub-repository en distributiecatalogus.

---

## License

Dit project is gelicentieerd onder de **Apache License 2.0**.

Zie het LICENSE-bestand voor details.
