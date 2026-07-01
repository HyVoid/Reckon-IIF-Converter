/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CRMRow {
  id: string; // Unique UI row ID
  invoiceNo: string;
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxAmount: number;
  grossTotal: number;
}

export interface CustomerMapping {
  id: string;
  crmCustomerName: string;
  reckonCustomerName: string;
}

export interface ProductMapping {
  id: string;
  crmProduct: string;
  reckonItem: string;
  reckonIncomeAcct: string;
  reckonTaxCode: string;
  taxRate: number; // e.g., 0.10 for 10%
}

export interface ValidationResult {
  rowId: string;
  invoiceNo: string;
  crmCustomer: string;
  reckonCustomer: string | null;
  reckonItem: string | null;
  incomeAccount: string | null;
  taxCode: string | null;
  taxRate: number;
  formulaGrossTotal: number;
  totalCheckDiff: number;
  status: 'PASS' | 'ERR_CUSTOMER' | 'ERR_PRODUCT' | 'WARN_DIFF';
  message: string;
}

export interface IIFLine {
  lineType: 'TRNS' | 'SPL' | 'ENDTRNS';
  docNum: string;
  date: string; // MM/DD/YYYY
  accnt: string;
  name: string;
  amount: string; // Positive for TRNS, Negative for SPL, empty for ENDTRNS
  taxable: 'Y' | 'N' | '';
  taxCode: string;
}
