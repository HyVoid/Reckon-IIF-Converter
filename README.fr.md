[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Automatisez les imports de factures CRM vers Reckon avec un framework réutilisable de validation et de génération IIF basé sur Excel

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support%20%2B%20Data%20Transformation-orange.svg)

**Convertissez les exports de factures CRM en lots de factures validés, prêts à l'import pour Reckon Accounting—sans codage, sans ressaisie manuelle, et sans avoir besoin de comprendre les structures de fichiers IIF.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours sans poser de questions.
>
> 🌐 **Ouvrir dans le navigateur** → [Version interactive HTML](https://hyvoid.github.io/Reckon-IIF-Converter/)
> 📥 **Télécharger Excel** → Version classeur Excel
>
> Disponible aux formats HTML navigateur et Microsoft Excel.

---

## Ce qu'il vous aide à suivre

* Les enregistrements de factures CRM qui ne peuvent pas être importés dans Reckon avant de créer des erreurs comptables.
* Les incohérences de correspondance client, code de taxe, article et compte entre les systèmes.
* L'état de préparation des lots d'import de factures et le risque d'échec d'import.
* Les factures en doublon et les données de référence comptables manquantes.
* Le débit de traitement des factures, les taux d'exception et les taux de réussite de validation.
* La valeur totale des factures préparées pour l'imputation financière en un seul lot.

---

# Pourquoi j'ai conçu ceci

La plupart des entreprises supposent que leur problème est de « créer un fichier IIF ».

En pratique, le vrai problème est différent.

La défaillance opérationnelle survient parce que les informations de facture existent déjà dans un CRM, mais les équipes financières doivent recréer manuellement les mêmes informations dans le logiciel de comptabilité. Chaque facture exige de ressaisir les clients, les produits, les codes de taxe, les comptes et les montants. À mesure que le volume de factures croît, l'effort comptable évolue presque linéairement.

La seconde défaillance est plus subtile : les entreprises ne découvrent souvent les erreurs d'import qu'après avoir tenté de charger les données dans le système comptable. À ce stade, les comptables doivent déterminer quel client, code de taxe, compte ou date a causé l'échec.

J'ai conçu cet outil parce que j'ai observé à maintes reprises le même schéma :

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

Le problème n'est pas le logiciel de comptabilité. Le problème est la couche de traduction manquante entre les systèmes opérationnels et les systèmes financiers.

Par exemple :

### Avant

Un export CRM contient :

| Client | Produit   | Taxe | Montant |
| ------ | --------- | ---- | ------- |
| ABC Pty | Service A | VAT | $1,500 |

Reckon attend :

| Client    | Article    | Code de taxe | Compte |
| --------- | ------- | ----------- | ------- |
| ABC PTY LTD | SERV001 | GST | 4-1000 |

L'import échoue parce que les structures sont incompatibles.

### Après

Le classeur automatiquement :

* fait correspondre les noms de clients,
* traduit les codes de produit,
* valide les codes de taxe,
* vérifie les correspondances de comptes,
* génère des structures de transaction IIF valides.

Plutôt que de construire une feuille de calcul ponctuelle, l'objectif était de productiser un cadre de raisonnement reproductible :

> "How can operational invoice data be transformed into accounting-compliant transaction data with minimal human intervention?"

---

## Les problèmes courants d'import de factures que cela résout

| Problème                            | Sans cet outil                              | Avec cet outil                           |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Saisie de facture en doublon            | Ventes et finance saisissent les factures manuellement | Données CRM saisies une fois et réutilisées |
| Incohérences des données de référence client | Échecs d'import découverts après le téléversement | La validation client intervient avant l'import |
| Incohérences des codes de taxe           | Reporting fiscal incorrect et imports rejetés   | Règles de correspondance fiscale appliquées automatiquement |
| Erreurs de codification des comptes      | Transactions imputées sur de mauvais grands livres | Validation du grand livre effectuée avant l'export |
| Différences de structure des lignes de facture | Reformatage manuel étendu                  | Transformation automatique facture vers IIF |
| Travail répété de préparation des lots | Chaque lot d'import reconstruit manuellement | Flux d'import standardisé et réutilisable |

---

## À qui cela s'adresse

Cet outil est conçu pour :

* Les petites et moyennes entreprises utilisant des systèmes CRM aux côtés de Reckon Accounting.
* Les directeurs financiers traitant des lots de factures récurrents.
* Les comptables responsables de la validation des imports et du traitement des comptes clients.
* Les consultants construisant des flux d'opérations financières légers.
* Les entreprises recherchant une automatisation des processus comptables à faible coût.

Cet outil n'est pas conçu pour :

* La synchronisation ERP en temps réel.
* Les plateformes middleware d'entreprise.
* Les intégrations comptables bidirectionnelles complètes.
* Les architectures d'intégration au niveau de la base de données.

Aucune expertise tableur n'est requise. Ouvrez la version navigateur et commencez immédiatement à traiter des lots de factures.

---

## À propos

Je conçois des outils légers d'aide à la décision et d'analyse opérationnelle pour des situations où il y a trop de pièces mobiles pour les gérer de façon fiable par la seule mémoire.

La question centrale derrière chaque outil est :

> **"What information needs to exist in one place so the next operational decision can be made confidently?"**

Le Reckon Invoice Import Builder est un exemple de cette approche : un cadre analytique réutilisable qui transforme la préparation des imports de factures d'une tâche administrative répétitive en un processus opérationnel standardisé.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</summary>

---

### Architecture du classeur

| Couche          | Feuille de calcul         | Fonction                                    |
| -------------- | ----------------- | ------------------------------------------- |
| Input          | CRM Export Paste  | Import brut des factures                          |
| Master Data    | Mapping Tables    | Correspondances client, article, taxe, grand livre            |
| Validation     | Validation Engine | Vérification des règles et détection des exceptions       |
| Transformation | IIF Generator     | Génération des transactions Reckon               |
| Output         | Export File       | Création du fichier d'import final                  |
| Monitoring     | Dashboard         | Indicateurs opérationnels et rapports d'exception |

#### Flux de données

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

### Trois pièges qui surprennent même les équipes financières expérimentées

#### Piège 1 — Supposer que les noms de clients sont des identifiants

Une équipe financière importe des factures en utilisant les noms d'affichage des clients.

L'hypothèse :

```text
CRM Customer = Accounting Customer
```

La réalité :

| CRM     | Reckon      |
| ------- | ----------- |
| ABC Pty | ABC PTY LTD |
| XYZ Ltd | XYZ LIMITED |

Résultat :

```text
Import Failure Rate: 18%
```

L'erreur de raisonnement consiste à supposer que les libellés sont des identifiants.

Approche correcte :

```text
CRM Customer
      ↓
Customer Mapping Table
      ↓
Reckon Customer ID
```

Résultat correct :

```text
Import Failure Rate: <1%
```

<details>
<summary>Logique des formules</summary>

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

#### Piège 2 — Supposer que les codes de taxe se traduisent automatiquement

Décision :

```text
Use CRM tax values directly.
```

Hypothèse erronée :

```text
VAT = GST
```

La réalité :

| Taxe CRM | Taxe Reckon |
| --------- | ------------ |
| VAT       | GST          |
| ZERO      | FRE          |
| EXEMPT    | N-T          |

Cela produit un reporting fiscal invalide.

Approche correcte :

```text
Tax Mapping Table
        ↓
Validation Rules
        ↓
Accounting Tax Code
```

Résultat correct :

* allocation fiscale conforme,
* risque réduit de rejet d'import,
* reporting cohérent.

<details>
<summary>Logique des formules</summary>

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

#### Piège 3 — Traiter les lignes de facture comme des documents de facture

Décision :

```text
Export rows directly.
```

Hypothèse erronée :

```text
1 Row = 1 Invoice
```

La réalité :

```text
Invoice Header
      ↓
Multiple Invoice Lines
      ↓
TRNS/SPL/ENDTRNS Structure
```

Sans restructuration :

```text
Import Failure
```

Approche correcte :

```text
Invoice Grouping
       ↓
Header Generation
       ↓
Line Generation
       ↓
IIF Assembly
```

Résultat correct :

```text
100% Reckon-compatible transaction structures
```

<details>
<summary>Logique des formules</summary>

```excel
=COUNTIFS(
    InvoiceNo,
    CurrentInvoice
)
```

</details>

---

### Scénario d'exemple

Une entreprise exporte 350 factures de son système CRM.

Export brut :

| Facture | Client | Produit   | Taxe | Montant |
| ------- | ------ | --------- | ---- | ------- |
| INV1001 | ABC Pty | Service A | VAT | 1500 |
| INV1001 | ABC Pty | Service B | VAT | 700 |

Le classeur effectue :

#### Étape 1 — Validation du client

```text
ABC Pty
    ↓
ABC PTY LTD
```

#### Étape 2 — Correspondance des produits

```text
Service A
      ↓
SERV001

Service B
      ↓
SERV002
```

#### Étape 3 — Traduction fiscale

```text
VAT
 ↓
GST
```

#### Étape 4 — Construction de la transaction

```text
TRNS
SPL
SPL
ENDTRNS
```

Résultat final :

| Indicateur       | Valeur       |
| --------------- | ----------- |
| Factures        | 350         |
| Valeur totale   | AUD 486,000 |
| Erreurs         | 7           |
| Avertissements  | 13          |
| Taux de réussite | 98.0%       |

Implication opérationnelle :

Au lieu de reconstruire manuellement 350 factures dans Reckon, le personnel financier ne résout que les 20 exceptions identifiées.

---

### Référence des formules

<details>
<summary>Formules de correspondance</summary>

| Objectif             | Formule  |
| ----------------- | -------- |
| Correspondance client   | XLOOKUP  |
| Correspondance produit  | XLOOKUP  |
| Correspondance fiscale   | XLOOKUP  |
| Correspondance grand livre | XLOOKUP  |
| Détection des doublons | COUNTIFS |

</details>

<details>
<summary>Formules de validation</summary>

| Objectif                     | Formule  |
| ------------------------- | -------- |
| Vérification des valeurs manquantes | IF       |
| Piège à erreurs          | IFERROR  |
| Validation de date         | ISNUMBER |
| Détection des factures en doublon | COUNTIFS |
| Classification des exceptions | IFS      |

</details>

<details>
<summary>Formules de génération IIF</summary>

| Objectif              | Formule  |
| ------------------ | -------- |
| Regroupement des transactions | UNIQUE   |
| Génération d'en-tête    | TEXTJOIN |
| Agrégation des lignes | SUMIFS   |
| Séquençage des enregistrements | SEQUENCE |

</details>

---

### Règles de validation

| Champ          | Règle                            | Comportement en cas d'erreur |
| -------------- | ------------------------------- | -------------- |
| Client         | Doit exister dans la table de correspondance     | ERROR          |
| Produit        | Doit exister dans la table des articles        | ERROR          |
| Code de taxe   | Doit correspondre à un code Reckon valide   | ERROR          |
| Compte du grand livre | Doit exister dans le plan comptable | ERROR          |
| Numéro de facture | Doit être unique                  | WARNING        |
| Date de facture | Doit être une date valide              | ERROR          |
| Quantité       | Doit être positive                | ERROR          |
| Montant        | Doit être numérique                 | ERROR          |
| Total facture  | Doit être équilibré                    | ERROR          |

</details>

---

## Autres outils de cette série

* **Inventory Planning & Replenishment Decision Engine** — prévision de la demande et analyse de réapprovisionnement.
* **Shopify/Etsy VAT Compliance Dashboard** — calcul de la taxe sur les places de marché et soutien à la déclaration.
* **Project Cost Allocation Control Center** — affectation des coûts de main-d'œuvre et analyse de rentabilité.
* **Marketing Attribution Audit Framework** — validation de l'attribution publicitaire et optimisation du budget.
* **Multi-Entity Logistics Operations Console** — visibilité opérationnelle sur les réseaux d'entrepôts.

D'autres outils sont disponibles via le dépôt GitHub et le catalogue de distribution.

---

## License

Ce projet est sous licence **Apache License 2.0**.

Voir le fichier LICENSE pour plus de détails.
