/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CRMRow, CustomerMapping, ProductMapping } from './types';

export const INITIAL_CRM_ROWS: CRMRow[] = [
  {
    id: 'crm-1',
    invoiceNo: 'INV-001',
    customerName: 'Acme Corp',
    invoiceDate: '2026-06-15',
    dueDate: '2026-07-15',
    productName: 'SaaS Pro License',
    quantity: 5,
    unitPrice: 120.00,
    taxAmount: 60.00,
    grossTotal: 660.00, // 5 * 120 = 600, 10% tax = 60
  },
  {
    id: 'crm-2',
    invoiceNo: 'INV-002',
    customerName: 'Delta LLC',
    invoiceDate: '2026-06-18',
    dueDate: '2026-07-18',
    productName: 'Custom Integration',
    quantity: 1,
    unitPrice: 1500.00,
    taxAmount: 150.00,
    grossTotal: 1650.00, // 1 * 1500 = 1500, 10% tax = 150
  },
  {
    id: 'crm-3',
    invoiceNo: 'INV-003',
    customerName: 'Beta Inc',
    invoiceDate: '2026-06-20',
    dueDate: '2026-07-20',
    productName: 'Consulting Hours',
    quantity: 8,
    unitPrice: 150.00,
    taxAmount: 0.00,
    grossTotal: 1200.00, // 8 * 150 = 1200, 0% tax = 0
  },
  {
    id: 'crm-4',
    invoiceNo: 'INV-004',
    customerName: 'Zeta Gmbh',
    invoiceDate: '2026-06-21',
    dueDate: '2026-07-21',
    productName: 'Premium Support',
    quantity: 2,
    unitPrice: 250.00,
    taxAmount: 50.00,
    grossTotal: 550.00, // 2 * 250 = 500, 10% tax = 50
  },
  {
    id: 'crm-5',
    invoiceNo: 'INV-005',
    customerName: 'Sigma Corp',
    invoiceDate: '2026-06-22',
    dueDate: '2026-07-22',
    productName: 'SaaS Pro License',
    quantity: 10,
    unitPrice: 120.00,
    taxAmount: 120.00,
    grossTotal: 1320.00, // 10 * 120 = 1200, 10% tax = 120
  },
  {
    id: 'crm-6',
    invoiceNo: 'INV-006',
    customerName: 'Omega Space', // Unmapped Customer
    invoiceDate: '2026-06-23',
    dueDate: '2026-07-23',
    productName: 'Custom Integration',
    quantity: 1,
    unitPrice: 2000.00,
    taxAmount: 200.00,
    grossTotal: 2200.00,
  },
  {
    id: 'crm-7',
    invoiceNo: 'INV-007',
    customerName: 'Acme Corp',
    invoiceDate: '2026-06-24',
    dueDate: '2026-07-24',
    productName: 'Hardware Device', // Unmapped Product
    quantity: 3,
    unitPrice: 300.00,
    taxAmount: 90.00,
    grossTotal: 990.00,
  },
  {
    id: 'crm-8',
    invoiceNo: 'INV-008',
    customerName: 'Delta LLC',
    invoiceDate: '2026-06-25',
    dueDate: '2026-07-25',
    productName: 'SaaS Pro License',
    quantity: 1,
    unitPrice: 99.99,
    taxAmount: 10.05,
    grossTotal: 115.00, // Rounding difference warning: 99.99 * 1.1 = 109.99, but CRM total says 115.00
  },
];

export const INITIAL_CUSTOMER_MAPPINGS: CustomerMapping[] = [
  {
    id: 'cust-map-1',
    crmCustomerName: 'Acme Corp',
    reckonCustomerName: 'Acme Corporation (ACME-01)',
  },
  {
    id: 'cust-map-2',
    crmCustomerName: 'Delta LLC',
    reckonCustomerName: 'Delta Logistics LLC (DEL-44)',
  },
  {
    id: 'cust-map-3',
    crmCustomerName: 'Beta Inc',
    reckonCustomerName: 'Beta Tech Inc (BETA-02)',
  },
  {
    id: 'cust-map-4',
    crmCustomerName: 'Zeta Gmbh',
    reckonCustomerName: 'Zeta Solutions GmbH (ZETA-09)',
  },
  {
    id: 'cust-map-5',
    crmCustomerName: 'Sigma Corp',
    reckonCustomerName: 'Sigma Group Pty Ltd (SIG-12)',
  },
];

export const INITIAL_PRODUCT_MAPPINGS: ProductMapping[] = [
  {
    id: 'prod-map-1',
    crmProduct: 'SaaS Pro License',
    reckonItem: 'PRO-LIC-01',
    reckonIncomeAcct: '41100-Sales',
    reckonTaxCode: 'GST',
    taxRate: 0.10,
  },
  {
    id: 'prod-map-2',
    crmProduct: 'Custom Integration',
    reckonItem: 'SVC-INT-02',
    reckonIncomeAcct: '41200-Professional Services',
    reckonTaxCode: 'GST',
    taxRate: 0.10,
  },
  {
    id: 'prod-map-3',
    crmProduct: 'Consulting Hours',
    reckonItem: 'SVC-CONS-01',
    reckonIncomeAcct: '41200-Professional Services',
    reckonTaxCode: 'FRE',
    taxRate: 0.00,
  },
  {
    id: 'prod-map-4',
    crmProduct: 'Premium Support',
    reckonItem: 'SVC-SUP-01',
    reckonIncomeAcct: '41150-Support Income',
    reckonTaxCode: 'GST',
    taxRate: 0.10,
  },
];
