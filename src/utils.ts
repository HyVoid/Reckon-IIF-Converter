/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CRMRow, CustomerMapping, ProductMapping, ValidationResult, IIFLine } from './types';

/**
 * Executes standard Excel formula logic to perform 3-way validation of original CRM rows
 * against mapping tables and audits amounts for discrepancies.
 */
export function validateData(
  crmRows: CRMRow[],
  customerMappings: CustomerMapping[],
  productMappings: ProductMapping[]
): ValidationResult[] {
  return crmRows.map((row) => {
    // 1. Resolve customer mapping (XLOOKUP)
    const custMap = customerMappings.find(
      (m) => m.crmCustomerName.trim().toLowerCase() === row.customerName.trim().toLowerCase()
    );
    const reckonCustomer = custMap ? custMap.reckonCustomerName : null;

    // 2. Resolve product/item/account/tax mapping (XLOOKUP)
    const prodMap = productMappings.find(
      (m) => m.crmProduct.trim().toLowerCase() === row.productName.trim().toLowerCase()
    );
    
    const reckonItem = prodMap ? prodMap.reckonItem : null;
    const incomeAccount = prodMap ? prodMap.reckonIncomeAcct : null;
    const taxCode = prodMap ? prodMap.reckonTaxCode : null;
    const taxRate = prodMap ? prodMap.taxRate : 0;

    // 3. Formula Gross Total (Calculated via quantity, price, and resolved tax rate)
    // Excel: Formula Gross Total = Qty * Price * (1 + TaxRate)
    const subtotal = row.quantity * row.unitPrice;
    const formulaGrossTotal = Number((subtotal * (1 + taxRate)).toFixed(2));

    // 4. Difference between computed formula gross total and CRM original gross total
    const totalCheckDiff = Number((formulaGrossTotal - row.grossTotal).toFixed(2));

    // 5. Run status diagnostics
    let status: 'PASS' | 'ERR_CUSTOMER' | 'ERR_PRODUCT' | 'WARN_DIFF' = 'PASS';
    let message = '✅ PASS';

    if (!reckonCustomer) {
      status = 'ERR_CUSTOMER';
      message = '❌ Error: Customer mapping is not configured';
    } else if (!reckonItem) {
      status = 'ERR_PRODUCT';
      message = '❌ Error: Product/Item mapping is not configured';
    } else if (Math.abs(totalCheckDiff) > 0.05) {
      status = 'WARN_DIFF';
      message = `⚠️ Warning: Rounding tail-difference exceeded $0.05 (Diff: $${totalCheckDiff.toFixed(2)})`;
    }

    return {
      rowId: row.id,
      invoiceNo: row.invoiceNo,
      crmCustomer: row.customerName,
      reckonCustomer,
      reckonItem,
      incomeAccount,
      taxCode,
      taxRate,
      formulaGrossTotal,
      totalCheckDiff,
      status,
      message,
    };
  });
}

/**
 * Automatically translates passed (PASS) records into the hierarchical TRNS -> SPL -> ENDTRNS
 * transactional structure demanded by Reckon Account systems.
 */
export function generateIIFLines(validationResults: ValidationResult[], crmRows: CRMRow[]): IIFLine[] {
  const passedResults = validationResults.filter((v) => v.status === 'PASS');
  const lines: IIFLine[] = [];

  passedResults.forEach((val) => {
    const originalRow = crmRows.find((r) => r.id === val.rowId);
    if (!originalRow) return;

    // Date formatted to Reckon standard: MM/DD/YYYY
    const formattedDate = formatDateToMMDDYYYY(originalRow.invoiceDate);

    const netAmount = originalRow.quantity * originalRow.unitPrice;

    // Line 1: TRNS header (Accounts Receivable Debit, represented as a POSITIVE amount in IIF)
    lines.push({
      lineType: 'TRNS',
      docNum: val.invoiceNo,
      date: formattedDate,
      accnt: 'Accounts Receivable',
      name: val.reckonCustomer || '',
      amount: originalRow.grossTotal.toFixed(2),
      taxable: '',
      taxCode: '',
    });

    // Line 2: SPL detail (Revenue Income Credit, represented as a NEGATIVE amount in IIF)
    lines.push({
      lineType: 'SPL',
      docNum: val.invoiceNo,
      date: formattedDate,
      accnt: val.incomeAccount || '',
      name: val.reckonCustomer || '',
      amount: (-netAmount).toFixed(2),
      taxable: 'Y',
      taxCode: val.taxCode || '',
    });

    // Line 3: ENDTRNS marker
    lines.push({
      lineType: 'ENDTRNS',
      docNum: val.invoiceNo,
      date: formattedDate,
      accnt: '',
      name: '',
      amount: '',
      taxable: '',
      taxCode: '',
    });
  });

  return lines;
}

/**
 * Formats a string of format YYYY-MM-DD to Reckon standard MM/DD/YYYY
 */
export function formatDateToMMDDYYYY(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${month}/${day}/${year}`;
  }
  // Fallback for different input formats
  const dateObj = new Date(dateStr);
  if (!isNaN(dateObj.getTime())) {
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  }
  return dateStr;
}

/**
 * Generates the literal text of the TSV IIF file format with correct standard headers.
 */
export function exportToIIFText(iifLines: IIFLine[]): string {
  // Reckon QuickBooks standard IIF transaction definition headers:
  const headers = [
    '!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tCLASS\tAMOUNT\tDOCNUM\tMEMO\tCLEAR\tTOPRINT\tADDR1\tADDR2\tADDR3\tADDR4\tADDR5\tDUEDATE\tTERMS\tPAID\tSHIPDATE\tSHIPVIA\tFOB\tTAXABLE\tEXTRA\tPONUM\tTOSEND\tREIMBEXP\tPAYMETH\tSHIPTO1\tSHIPTO2\tSHIPTO3\tSHIPTO4\tSHIPTO5\tSADR1\tSADR2\tSADR3\tSADR4\tSADR5',
    '!SPL\tSPLID\tTRNSTYPE\tDATE\tACCNT\tNAME\tCLASS\tAMOUNT\tDOCNUM\tMEMO\tCLEAR\tQNTY\tPRICE\tINVITEM\tPAYMETH\tTAXABLE\tVALUENO\tEXTRA\tTAXCODE\tREIMBEXP',
    '!ENDTRNS'
  ].join('\n');

  const rows = iifLines.map((line) => {
    if (line.lineType === 'TRNS') {
      // Columns matching !TRNS header map
      // LineType | ID | Type | Date | Accnt | Name | Class | Amount | DocNum ...
      return `TRNS\t\tINVOICE\t${line.date}\t${line.accnt}\t${line.name}\t\t${line.amount}\t${line.docNum}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t`;
    } else if (line.lineType === 'SPL') {
      // Columns matching !SPL header map
      // LineType | ID | Type | Date | Accnt | Name | Class | Amount | DocNum | Memo | Clear | Qnty | Price | InvItem | PayMeth | Taxable | ValueNo | Extra | TaxCode | ReimbExp
      return `SPL\t\tINVOICE\t${line.date}\t${line.accnt}\t${line.name}\t\t${line.amount}\t${line.docNum}\t\t\t\t\t\t\t${line.taxable}\t\t\t${line.taxCode}\t`;
    } else {
      return 'ENDTRNS';
    }
  });

  return [headers, ...rows].join('\n');
}
