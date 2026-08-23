# Automate CRM-to-Reckon Invoice Imports with a Reusable Excel-Based Validation & IIF Generation Framework

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support%20%2B%20Data%20Transformation-orange.svg)

**Convert CRM invoice exports into validated, import-ready Reckon Accounting invoice batches—without coding, without manual re-entry, and without needing to understand IIF file structures.**

**No signup. No installation. Free in your browser.**

Try the browser version for free. If you need the Excel version, you can buy it with a 7-day money-back guarantee.
>
> 🌐 **Open in Browser** → [HTML interactive version](https://hyvoid.github.io/Reckon-IIF-Converter/)
> 📥 **Download Excel** → Excel workbook version
>
> Available in both browser-based HTML and Microsoft Excel formats.

---

## What It Helps You Track

* CRM invoice records that cannot be imported into Reckon before they create accounting errors.
* Customer, tax code, item, and account mapping mismatches across systems.
* Batch invoice import readiness status and import failure risk.
* Duplicate invoices and missing accounting master data.
* Invoice processing throughput, exception rates, and validation success rates.
* Total invoice value prepared for financial posting in a single batch.

---

# Why I Built This

Most businesses assume their problem is "creating an IIF file."

In practice, the real problem is different.

The operational failure occurs because invoice information already exists inside a CRM, but finance teams must manually recreate the same information inside accounting software. Every invoice requires retyping customers, products, tax codes, accounts, and amounts. As invoice volume grows, accounting effort scales almost linearly.

The second failure is more subtle: businesses often discover import errors only after attempting to load data into the accounting system. At that point, accountants must investigate which customer, tax code, account, or date caused the failure.

I built this tool because I repeatedly observed the same pattern:

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

The issue is not the accounting software. The issue is the missing translation layer between operational systems and financial systems.

For example:

### Before

A CRM export contains:

| Customer | Product   | Tax | Amount |
| -------- | --------- | --- | ------ |
| ABC Pty  | Service A | VAT | $1,500 |

Reckon expects:

| Customer    | Item    | Tax Code | Account |
| ----------- | ------- | -------- | ------- |
| ABC PTY LTD | SERV001 | GST      | 4-1000  |

The import fails because the structures are incompatible.

### After

The workbook automatically:

* maps customer names,
* translates product codes,
* validates tax codes,
* verifies account mappings,
* generates valid IIF transaction structures.

Instead of building a one-off spreadsheet, the goal was to productize a repeatable reasoning framework:

> "How can operational invoice data be transformed into accounting-compliant transaction data with minimal human intervention?"

---

## Common Invoice Import Problems This Solves

| Problem                            | Without This Tool                              | With This Tool                           |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Duplicate invoice entry            | Sales and finance both enter invoices manually | CRM data entered once and reused         |
| Customer master mismatches         | Import failures discovered after upload        | Customer validation occurs before import |
| Tax code inconsistencies           | Incorrect tax reporting and rejected imports   | Tax mapping rules enforced automatically |
| Account coding errors              | Transactions posted to wrong ledgers           | GL validation performed before export    |
| Invoice line structure differences | Extensive manual reformatting                  | Automatic invoice-to-IIF transformation  |
| Repeated batch preparation work    | Every import batch rebuilt manually            | Standardized reusable import workflow    |

---

## Who This Is For

This tool is designed for:

* Small and medium businesses using CRM systems alongside Reckon Accounting.
* Finance managers processing recurring invoice batches.
* Accountants responsible for import validation and accounts receivable processing.
* Consultants building lightweight finance operations workflows.
* Businesses seeking low-cost accounting process automation.

This tool is not designed for:

* Real-time ERP synchronization.
* Enterprise middleware platforms.
* Full bidirectional accounting integrations.
* Database-level integration architectures.

No spreadsheet expertise is required. Open the browser version and start processing invoice batches immediately.

---

## About

I build lightweight decision-support and operational analysis tools for situations where there are too many moving parts to manage reliably in memory alone.

The central question behind every tool is:

> **"What information needs to exist in one place so the next operational decision can be made confidently?"**

The Reckon Invoice Import Builder is one example of this approach: a reusable analytical framework that transforms invoice import preparation from a repetitive administrative task into a standardized operational process.

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

| Layer          | Worksheet         | Function                                    |
| -------------- | ----------------- | ------------------------------------------- |
| Input          | CRM Export Paste  | Raw invoice import                          |
| Master Data    | Mapping Tables    | Customer, item, tax, GL mappings            |
| Validation     | Validation Engine | Rule checking and exception detection       |
| Transformation | IIF Generator     | Reckon transaction generation               |
| Output         | Export File       | Final import file creation                  |
| Monitoring     | Dashboard         | Operational metrics and exception reporting |

#### Data Flow

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

### Three Traps That Catch Even Experienced Finance Teams

#### Trap 1 — Assuming Customer Names Are Identifiers

A finance team imports invoices using customer display names.

The assumption:

```text
CRM Customer = Accounting Customer
```

Reality:

| CRM     | Reckon      |
| ------- | ----------- |
| ABC Pty | ABC PTY LTD |
| XYZ Ltd | XYZ LIMITED |

Result:

```text
Import Failure Rate: 18%
```

The reasoning error is assuming labels are identifiers.

Correct approach:

```text
CRM Customer
      ↓
Customer Mapping Table
      ↓
Reckon Customer ID
```

Correct outcome:

```text
Import Failure Rate: <1%
```

<details>
<summary>Formula logic</summary>

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

#### Trap 2 — Assuming Tax Codes Translate Automatically

Decision:

```text
Use CRM tax values directly.
```

Faulty assumption:

```text
VAT = GST
```

Reality:

| CRM Tax | Reckon Tax |
| ------- | ---------- |
| VAT     | GST        |
| ZERO    | FRE        |
| EXEMPT  | N-T        |

This produces invalid tax reporting.

Correct approach:

```text
Tax Mapping Table
        ↓
Validation Rules
        ↓
Accounting Tax Code
```

Correct outcome:

* compliant tax allocation,
* reduced import rejection risk,
* consistent reporting.

<details>
<summary>Formula logic</summary>

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

#### Trap 3 — Treating Invoice Rows as Invoice Documents

Decision:

```text
Export rows directly.
```

Faulty assumption:

```text
1 Row = 1 Invoice
```

Reality:

```text
Invoice Header
      ↓
Multiple Invoice Lines
      ↓
TRNS/SPL/ENDTRNS Structure
```

Without restructuring:

```text
Import Failure
```

Correct approach:

```text
Invoice Grouping
       ↓
Header Generation
       ↓
Line Generation
       ↓
IIF Assembly
```

Correct outcome:

```text
100% Reckon-compatible transaction structures
```

<details>
<summary>Formula logic</summary>

```excel
=COUNTIFS(
    InvoiceNo,
    CurrentInvoice
)
```

</details>

---

### Example Scenario

A business exports 350 invoices from its CRM system.

Raw export:

| Invoice | Customer | Product   | Tax | Amount |
| ------- | -------- | --------- | --- | ------ |
| INV1001 | ABC Pty  | Service A | VAT | 1500   |
| INV1001 | ABC Pty  | Service B | VAT | 700    |

The workbook performs:

#### Step 1 — Customer Validation

```text
ABC Pty
    ↓
ABC PTY LTD
```

#### Step 2 — Product Mapping

```text
Service A
      ↓
SERV001

Service B
      ↓
SERV002
```

#### Step 3 — Tax Translation

```text
VAT
 ↓
GST
```

#### Step 4 — Transaction Construction

```text
TRNS
SPL
SPL
ENDTRNS
```

Final result:

| Metric       | Value       |
| ------------ | ----------- |
| Invoices     | 350         |
| Total Value  | AUD 486,000 |
| Errors       | 7           |
| Warnings     | 13          |
| Success Rate | 98.0%       |

Operational implication:

Instead of manually rebuilding 350 invoices inside Reckon, finance personnel resolve only the 20 identified exceptions.

---

### Formula Reference

<details>
<summary>Mapping formulas</summary>

| Purpose             | Formula  |
| ------------------- | -------- |
| Customer mapping    | XLOOKUP  |
| Product mapping     | XLOOKUP  |
| Tax mapping         | XLOOKUP  |
| GL mapping          | XLOOKUP  |
| Duplicate detection | COUNTIFS |

</details>

<details>
<summary>Validation formulas</summary>

| Purpose                     | Formula  |
| --------------------------- | -------- |
| Missing value check         | IF       |
| Error trapping              | IFERROR  |
| Date validation             | ISNUMBER |
| Duplicate invoice detection | COUNTIFS |
| Exception classification    | IFS      |

</details>

<details>
<summary>IIF generation formulas</summary>

| Purpose              | Formula  |
| -------------------- | -------- |
| Transaction grouping | UNIQUE   |
| Header generation    | TEXTJOIN |
| Line aggregation     | SUMIFS   |
| Record sequencing    | SEQUENCE |

</details>

---

### Validation Rules

| Field          | Rule                            | Error Behavior |
| -------------- | ------------------------------- | -------------- |
| Customer       | Must exist in mapping table     | ERROR          |
| Product        | Must exist in item table        | ERROR          |
| Tax Code       | Must map to valid Reckon code   | ERROR          |
| GL Account     | Must exist in chart of accounts | ERROR          |
| Invoice Number | Must be unique                  | WARNING        |
| Invoice Date   | Must be valid date              | ERROR          |
| Quantity       | Must be positive                | ERROR          |
| Amount         | Must be numeric                 | ERROR          |
| Invoice Total  | Must balance                    | ERROR          |

</details>

---

## Other Tools in This Series

* **Inventory Planning & Replenishment Decision Engine** — demand forecasting and replenishment analysis.
* **Shopify/Etsy VAT Compliance Dashboard** — marketplace tax calculation and filing support.
* **Project Cost Allocation Control Center** — labor cost allocation and profitability analysis.
* **Marketing Attribution Audit Framework** — advertising attribution validation and budget optimization.
* **Multi-Entity Logistics Operations Console** — operational visibility across warehouse networks.

More tools available via GitHub repository and distribution catalog.

---

## License

This project is licensed under the **Apache License 2.0**.

See the LICENSE file for details.
