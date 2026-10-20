[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Automatice las importaciones de facturas de CRM a Reckon con un marco reutilizable de validación y generación de IIF basado en Excel

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support%20%2B%20Data%20Transformation-orange.svg)

**Convierta las exportaciones de facturas de CRM en lotes de facturas de Reckon Accounting validados y listos para importar—sin programar, sin reingreso manual y sin necesidad de entender las estructuras de archivos IIF.**

**Sin registro. Sin instalación. Gratis en su navegador.**

Pruebe la versión de navegador gratis. Si necesita la versión de Excel, puede comprarla con una garantía de devolución de dinero de 30 días sin hacer preguntas.
>
> 🌐 **Abrir en el navegador** → [Versión interactiva HTML](https://hyvoid.github.io/Reckon-IIF-Converter/)
> 📥 **Descargar Excel** → Versión de libro de Excel
>
> Disponible en formatos HTML basado en navegador y Microsoft Excel.

---

## Qué le ayuda a rastrear

* Registros de facturas de CRM que no se pueden importar a Reckon antes de que creen errores contables.
* Discrepancias de mapeo de clientes, códigos de impuestos, artículos y cuentas entre sistemas.
* Estado de preparación de la importación de lotes de facturas y riesgo de fallo de importación.
* Facturas duplicadas y datos maestros contables faltantes.
* Rendimiento de procesamiento de facturas, tasas de excepción y tasas de éxito de validación.
* Valor total de las facturas preparadas para la contabilización financiera en un solo lote.

---

## Por qué construí esto

La mayoría de las empresas suponen que su problema es "crear un archivo IIF".

En la práctica, el problema real es diferente.

El fallo operativo ocurre porque la información de las facturas ya existe dentro de un CRM, pero los equipos de finanzas deben recrear manualmente la misma información dentro del software de contabilidad. Cada factura requiere volver a teclear clientes, productos, códigos de impuestos, cuentas e importes. A medida que crece el volumen de facturas, el esfuerzo contable escala casi linealmente.

El segundo fallo es más sutil: las empresas a menudo descubren los errores de importación solo después de intentar cargar los datos en el sistema contable. En ese punto, los contadores deben investigar qué cliente, código de impuesto, cuenta o fecha causó el fallo.

Construí esta herramienta porque observé repetidamente el mismo patrón:

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

El problema no es el software de contabilidad. El problema es la capa de traducción faltante entre los sistemas operativos y los sistemas financieros.

Por ejemplo:

### Antes

Una exportación de CRM contiene:

| Cliente | Producto   | Impuesto | Importe |
| ------- | --------- | ------- | ------- |
| ABC Pty | Service A | VAT | $1,500 |

Reckon espera:

| Cliente    | Artículo    | Código de impuesto | Cuenta |
| --------- | ------- | --------- | ------- |
| ABC PTY LTD | SERV001 | GST | 4-1000 |

La importación falla porque las estructuras son incompatibles.

### Después

El libro de trabajo automáticamente:

* mapea los nombres de los clientes,
* traduce los códigos de producto,
* valida los códigos de impuestos,
* verifica los mapeos de cuentas,
* genera estructuras de transacción IIF válidas.

En lugar de construir una hoja de cálculo puntual, el objetivo era productizar un marco de razonamiento repetible:

> "How can operational invoice data be transformed into accounting-compliant transaction data with minimal human intervention?"

---

## Problemas comunes de importación de facturas que esto resuelve

| Problema                            | Sin esta herramienta                              | Con esta herramienta                           |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Ingreso de factura duplicado            | Ventas y finanzas ingresan las facturas manualmente | Los datos del CRM se ingresan una vez y se reutilizan |
| Discrepancias de datos maestros de clientes | Fallos de importación descubiertos después de la carga | La validación de clientes ocurre antes de la importación |
| Inconsistencias de códigos de impuestos | Informes fiscales incorrectos e importaciones rechazadas | Reglas de mapeo de impuestos aplicadas automáticamente |
| Errores de codificación de cuentas      | Transacciones registradas en libros mayores incorrectos | Validación del libro mayor realizada antes de la exportación |
| Diferencias de estructura de líneas de factura | Reformateo manual extenso                  | Transformación automática de factura a IIF |
| Trabajo repetido de preparación de lotes | Cada lote de importación reconstruido manualmente | Flujo de importación estandarizado y reutilizable |

---

## Para quién es esto

Esta herramienta está diseñada para:

* Pequeñas y medianas empresas que usan sistemas de CRM junto con Reckon Accounting.
* Gerentes de finanzas que procesan lotes de facturas recurrentes.
* Contadores responsables de la validación de importaciones y el procesamiento de cuentas por cobrar.
* Consultores que construyen flujos de trabajo de operaciones financieras ligeros.
* Empresas que buscan automatización de procesos contables de bajo costo.

Esta herramienta no está diseñada para:

* Sincronización ERP en tiempo real.
* Plataformas middleware empresariales.
* Integraciones contables bidireccionales completas.
* Arquitecturas de integración a nivel de base de datos.

No se requiere experiencia en hojas de cálculo. Abra la versión de navegador y comience a procesar lotes de facturas de inmediato.

---

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión y análisis operativo para situaciones en las que hay demasiadas piezas en movimiento para gestionarlas de forma confiable solo con la memoria.

La pregunta central detrás de cada herramienta es:

> **"What information needs to exist in one place so the next operational decision can be made confidently?"**

El Reckon Invoice Import Builder es un ejemplo de este enfoque: un marco analítico reutilizable que transforma la preparación de la importación de facturas de una tarea administrativa repetitiva en un proceso operativo estandarizado.

---

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

---

### Arquitectura del libro de trabajo

| Capa          | Hoja de trabajo         | Función                                    |
| -------------- | ----------------- | ------------------------------------------- |
| Input          | CRM Export Paste  | Importación bruta de facturas                          |
| Master Data    | Mapping Tables    | Mapeos de clientes, artículos, impuestos y libro mayor            |
| Validation     | Validation Engine | Verificación de reglas y detección de excepciones       |
| Transformation | IIF Generator     | Generación de transacciones de Reckon               |
| Output         | Export File       | Creación del archivo de importación final                  |
| Monitoring     | Dashboard         | Métricas operativas e informes de excepciones |

#### Flujo de datos

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

### Tres trampas que atrapan incluso a equipos financieros experimentados

#### Trampa 1 — Suponer que los nombres de los clientes son identificadores

Un equipo financiero importa facturas usando los nombres de visualización de los clientes.

La suposición:

```text
CRM Customer = Accounting Customer
```

La realidad:

| CRM     | Reckon      |
| ------- | ----------- |
| ABC Pty | ABC PTY LTD |
| XYZ Ltd | XYZ LIMITED |

Resultado:

```text
Import Failure Rate: 18%
```

El error de razonamiento es suponer que las etiquetas son identificadores.

Enfoque correcto:

```text
CRM Customer
      ↓
Customer Mapping Table
      ↓
Reckon Customer ID
```

Resultado correcto:

```text
Import Failure Rate: <1%
```

<details>
<summary>Lógica de fórmulas</summary>

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

#### Trampa 2 — Suponer que los códigos de impuestos se traducen automáticamente

Decisión:

```text
Use CRM tax values directly.
```

Suposición errónea:

```text
VAT = GST
```

La realidad:

| Impuesto CRM | Impuesto Reckon |
| --------- | ------------ |
| VAT       | GST          |
| ZERO      | FRE          |
| EXEMPT    | N-T          |

Esto produce informes fiscales inválidos.

Enfoque correcto:

```text
Tax Mapping Table
        ↓
Validation Rules
        ↓
Accounting Tax Code
```

Resultado correcto:

* asignación fiscal conforme,
* riesgo reducido de rechazo de importación,
* informes consistentes.

<details>
<summary>Lógica de fórmulas</summary>

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

#### Trampa 3 — Tratar las filas de factura como documentos de factura

Decisión:

```text
Export rows directly.
```

Suposición errónea:

```text
1 Row = 1 Invoice
```

La realidad:

```text
Invoice Header
      ↓
Multiple Invoice Lines
      ↓
TRNS/SPL/ENDTRNS Structure
```

Sin reestructuración:

```text
Import Failure
```

Enfoque correcto:

```text
Invoice Grouping
       ↓
Header Generation
       ↓
Line Generation
       ↓
IIF Assembly
```

Resultado correcto:

```text
100% Reckon-compatible transaction structures
```

<details>
<summary>Lógica de fórmulas</summary>

```excel
=COUNTIFS(
    InvoiceNo,
    CurrentInvoice
)
```

</details>

---

### Escenario de ejemplo

Una empresa exporta 350 facturas de su sistema CRM.

Exportación bruta:

| Factura | Cliente | Producto   | Impuesto | Importe |
| ------- | ------ | --------- | ------- | ------- |
| INV1001 | ABC Pty | Service A | VAT | 1500 |
| INV1001 | ABC Pty | Service B | VAT | 700 |

El libro de trabajo realiza:

#### Paso 1 — Validación del cliente

```text
ABC Pty
    ↓
ABC PTY LTD
```

#### Paso 2 — Mapeo de productos

```text
Service A
      ↓
SERV001

Service B
      ↓
SERV002
```

#### Paso 3 — Traducción de impuestos

```text
VAT
 ↓
GST
```

#### Paso 4 — Construcción de la transacción

```text
TRNS
SPL
SPL
ENDTRNS
```

Resultado final:

| Métrica       | Valor       |
| ------------- | ----------- |
| Facturas      | 350         |
| Valor total   | AUD 486,000 |
| Errores       | 7           |
| Advertencias  | 13          |
| Tasa de éxito | 98.0%       |

Implicación operativa:

En lugar de reconstruir manualmente 350 facturas dentro de Reckon, el personal de finanzas resuelve solo las 20 excepciones identificadas.

---

### Referencia de fórmulas

<details>
<summary>Fórmulas de mapeo</summary>

| Propósito             | Fórmula  |
| ----------------- | -------- |
| Mapeo de clientes   | XLOOKUP  |
| Mapeo de productos  | XLOOKUP  |
| Mapeo de impuestos  | XLOOKUP  |
| Mapeo de libro mayor | XLOOKUP  |
| Detección de duplicados | COUNTIFS |

</details>

<details>
<summary>Fórmulas de validación</summary>

| Propósito                     | Fórmula  |
| ------------------------- | -------- |
| Verificación de valores faltantes | IF       |
| Captura de errores          | IFERROR  |
| Validación de fecha         | ISNUMBER |
| Detección de facturas duplicadas | COUNTIFS |
| Clasificación de excepciones | IFS      |

</details>

<details>
<summary>Fórmulas de generación de IIF</summary>

| Propósito              | Fórmula  |
| ------------------ | -------- |
| Agrupación de transacciones | UNIQUE   |
| Generación de encabezado | TEXTJOIN |
| Agregación de líneas | SUMIFS   |
| Secuenciación de registros | SEQUENCE |

</details>

---

### Reglas de validación

| Campo          | Regla                            | Comportamiento de error |
| -------------- | ------------------------------- | -------------- |
| Cliente        | Debe existir en la tabla de mapeo     | ERROR          |
| Producto       | Debe existir en la tabla de artículos        | ERROR          |
| Código de impuesto | Debe mapear a un código de Reckon válido   | ERROR          |
| Cuenta del libro mayor | Debe existir en el plan de cuentas | ERROR          |
| Número de factura | Debe ser único                  | WARNING        |
| Fecha de factura | Debe ser una fecha válida              | ERROR          |
| Cantidad       | Debe ser positiva                | ERROR          |
| Importe        | Debe ser numérico                 | ERROR          |
| Total de factura | Debe estar equilibrado                    | ERROR          |

</details>

---

## Otras herramientas de esta serie

* **Inventory Planning & Replenishment Decision Engine** — previsión de la demanda y análisis de reabastecimiento.
* **Shopify/Etsy VAT Compliance Dashboard** — cálculo de impuestos de mercado y soporte de declaración.
* **Project Cost Allocation Control Center** — asignación de costos laborales y análisis de rentabilidad.
* **Marketing Attribution Audit Framework** — validación de atribución publicitaria y optimización del presupuesto.
* **Multi-Entity Logistics Operations Console** — visibilidad operativa en redes de almacenes.

Más herramientas disponibles a través del repositorio de GitHub y el catálogo de distribución.

---

## License

Este proyecto está licenciado bajo la **Apache License 2.0**.

Consulte el archivo LICENSE para más detalles.
