/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CRMRow } from '../types';
import { Plus, Trash2, ClipboardPaste, Info, Sparkles } from 'lucide-react';

interface CRMDataPasteSheetProps {
  crmRows: CRMRow[];
  onChange: (rows: CRMRow[]) => void;
}

export default function CRMDataPasteSheet({ crmRows, onChange }: CRMDataPasteSheetProps) {
  const [bulkText, setBulkText] = useState('');
  const [showBulkPaste, setShowBulkPaste] = useState(false);

  // Auto-calculate helper
  const handleCellChange = (id: string, field: keyof CRMRow, value: any) => {
    const updated = crmRows.map((row) => {
      if (row.id === id) {
        const newRow = { ...row, [field]: value };
        // If changing quantity, unitPrice, or taxAmount, automatically compute grossTotal
        if (field === 'quantity' || field === 'unitPrice' || field === 'taxAmount') {
          const q = field === 'quantity' ? Number(value) : row.quantity;
          const p = field === 'unitPrice' ? Number(value) : row.unitPrice;
          const t = field === 'taxAmount' ? Number(value) : row.taxAmount;
          newRow.grossTotal = Number((q * p + t).toFixed(2));
        }
        return newRow;
      }
      return row;
    });
    onChange(updated);
  };

  const addRow = () => {
    const newRow: CRMRow = {
      id: `crm-${Date.now()}-${Math.random()}`,
      invoiceNo: `INV-${String(crmRows.length + 1).padStart(3, '0')}`,
      customerName: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      productName: '',
      quantity: 1,
      unitPrice: 0,
      taxAmount: 0,
      grossTotal: 0,
    };
    onChange([...crmRows, newRow]);
  };

  const deleteRow = (id: string) => {
    onChange(crmRows.filter((r) => r.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all invoice rows?')) {
      onChange([]);
    }
  };

  const handleBulkParse = () => {
    if (!bulkText.trim()) return;

    // Split text by lines
    const lines = bulkText.split('\n');
    const parsedRows: CRMRow[] = [];

    lines.forEach((line) => {
      if (!line.trim()) return;
      // Excel/Google Sheets paste is tab-delimited (\t)
      // Standard format expected: InvoiceNo, CustomerName, Date, DueDate, Product, Qty, Price, Tax, Gross
      const cols = line.split('\t');
      if (cols.length >= 2) {
        const invoiceNo = cols[0]?.trim() || `INV-${String(crmRows.length + parsedRows.length + 1).padStart(3, '0')}`;
        const customerName = cols[1]?.trim() || 'New Customer';
        const invoiceDate = cols[2]?.trim() || new Date().toISOString().split('T')[0];
        const dueDate = cols[3]?.trim() || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const productName = cols[4]?.trim() || 'Product Name';
        const quantity = isNaN(Number(cols[5])) ? 1 : Number(cols[5]);
        const unitPrice = isNaN(Number(cols[6])) ? 0 : Number(cols[6]);
        const taxAmount = isNaN(Number(cols[7])) ? Number((quantity * unitPrice * 0.1).toFixed(2)) : Number(cols[7]);
        const grossTotal = isNaN(Number(cols[8])) ? Number((quantity * unitPrice + taxAmount).toFixed(2)) : Number(cols[8]);

        parsedRows.push({
          id: `crm-${Date.now()}-${Math.random()}-${parsedRows.length}`,
          invoiceNo,
          customerName,
          invoiceDate,
          dueDate,
          productName,
          quantity,
          unitPrice,
          taxAmount,
          grossTotal,
        });
      }
    });

    if (parsedRows.length > 0) {
      onChange([...crmRows, ...parsedRows]);
      setBulkText('');
      setShowBulkPaste(false);
    } else {
      alert('Could not parse any rows. Make sure you copy columns directly from Excel or separate items with tabs.');
    }
  };

  const maxGrossTotal = Math.max(...crmRows.map((r) => r.grossTotal), 1);

  return (
    <div className="animate-fade-up">
      {/* Description Panel */}
      <div className="insight-box p-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[#051C2C] tracking-tight mb-1">
            CRM original invoice data paste & editor
          </h2>
          <p className="text-xs text-[#888888]">
            This sheet holds your CRM transactional data. Cells styled in{' '}
            <span className="bg-[#FFFDE7] px-1.5 py-0.5 rounded border border-[#E8E8E6] text-amber-800 font-mono text-[11px]">
              light yellow
            </span>{' '}
            are fully editable. Enter details manually, add empty rows, or click "Bulk paste" to dump full columns directly from Microsoft Excel.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkPaste(!showBulkPaste)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#051C2C] text-[#FFFFFF] hover:bg-[#2251FF] rounded-md text-xs font-semibold cursor-pointer transition-all"
            id="btn-toggle-bulk-paste"
          >
            <ClipboardPaste size={13} />
            Bulk Paste from Excel
          </button>
        </div>
      </div>

      {/* Bulk Paste Area (Collapsible) */}
      {showBulkPaste && (
        <div className="bg-[#FFFFFF] p-5 rounded-xl shadow-md mb-6 transition-all border-l-4 border-[#2251FF]">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-[#2251FF]" />
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#051C2C]">
              Excel TSV Direct Import Panel
            </h3>
          </div>
          <p className="text-xs text-[#888888] mb-3">
            Copy rows from an Excel sheet containing these columns in order: <br />
            <strong className="text-[#051C2C] font-mono">Invoice No | Customer Name | Invoice Date (YYYY-MM-DD) | Due Date | Product Name | Quantity | Unit Price | Tax Amount | Gross Total</strong>
            <br />Then paste them directly into the area below. We will parse the tabs and add them to your workspace instantly.
          </p>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="Paste here... E.g.&#10;INV-101&#9;Acme Gmbh&#9;2026-06-01&#9;2026-07-01&#9;SaaS Pro License&#9;5&#9;100.00&#9;50.00&#9;550.00"
            className="w-full h-32 bg-[#FFFDE7] border border-[#E8E8E6] p-3 rounded-md font-mono text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] mb-3"
            id="textarea-bulk-paste"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowBulkPaste(false)}
              className="px-3 py-1.5 border border-[#E8E8E6] rounded-md text-xs font-medium text-[#888888] hover:bg-[#F5F5F2] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkParse}
              className="px-4 py-1.5 bg-[#2251FF] text-[#FFFFFF] hover:bg-[#051C2C] rounded-md text-xs font-semibold cursor-pointer transition-all"
              id="btn-submit-bulk-paste"
            >
              Parse and Append Rows
            </button>
          </div>
        </div>
      )}

      {/* Spreadsheet Table Container */}
      <div className="bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden">
        {/* Table Toolbar */}
        <div className="px-6 py-3 border-b border-[#E8E8E6] flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-1 text-[#888888] text-xs font-mono">
            <span>Total rows:</span>
            <span className="text-[#051C2C] font-bold">{crmRows.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-[#D32F2F] hover:bg-red-50 rounded-md text-xs font-semibold transition-all cursor-pointer"
              id="btn-clear-crm-rows"
            >
              <Trash2 size={13} />
              Clear Table
            </button>
            <button
              onClick={addRow}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#2251FF] text-[#FFFFFF] hover:bg-[#051C2C] rounded-md text-xs font-semibold transition-all cursor-pointer"
              id="btn-add-crm-row"
            >
              <Plus size={13} />
              Add Raw Row
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[1200px]" id="table-crm-paste">
            <thead>
              <tr className="bg-[#051C2C]/[0.04] border-b-2 border-[#051C2C]/[0.12] h-11 text-[13px]">
                <th className="w-16 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-center">Row</th>
                <th className="w-28 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Invoice No</th>
                <th className="w-48 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Customer Name</th>
                <th className="w-36 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Invoice Date</th>
                <th className="w-36 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Due Date</th>
                <th className="w-48 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Product Name</th>
                <th className="w-24 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Quantity</th>
                <th className="w-32 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Unit Price</th>
                <th className="w-32 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Tax Amount</th>
                <th className="w-40 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Gross Total</th>
                <th className="w-16 px-4 py-2 text-center uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Del</th>
              </tr>
            </thead>
            <tbody>
              {crmRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-[#888888]">
                    No original CRM records. Click "+ Add Raw Row" or use "Bulk Paste" above to begin.
                  </td>
                </tr>
              ) : (
                crmRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#E8E8E6] hover:bg-[#F5F5F2] h-10 transition-colors text-[13px]"
                  >
                    {/* Index */}
                    <td className="px-4 py-1.5 text-[#888888] font-mono text-center">{index + 1}</td>

                    {/* Invoice No */}
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.invoiceNo}
                        onChange={(e) => handleCellChange(row.id, 'invoiceNo', e.target.value)}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                      />
                    </td>

                    {/* Customer Name */}
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.customerName}
                        onChange={(e) => handleCellChange(row.id, 'customerName', e.target.value)}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                        placeholder="e.g. Acme Corp"
                      />
                    </td>

                    {/* Invoice Date */}
                    <td className="px-2 py-1.5">
                      <input
                        type="date"
                        value={row.invoiceDate}
                        onChange={(e) => handleCellChange(row.id, 'invoiceDate', e.target.value)}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                      />
                    </td>

                    {/* Due Date */}
                    <td className="px-2 py-1.5">
                      <input
                        type="date"
                        value={row.dueDate}
                        onChange={(e) => handleCellChange(row.id, 'dueDate', e.target.value)}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                      />
                    </td>

                    {/* Product Name */}
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.productName}
                        onChange={(e) => handleCellChange(row.id, 'productName', e.target.value)}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                        placeholder="e.g. SaaS Pro License"
                      />
                    </td>

                    {/* Quantity */}
                    <td className="px-2 py-1.5 text-right">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleCellChange(row.id, 'quantity', Number(e.target.value))}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-right text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                        min="0"
                        step="1"
                      />
                    </td>

                    {/* Unit Price */}
                    <td className="px-2 py-1.5 text-right">
                      <input
                        type="number"
                        value={row.unitPrice}
                        onChange={(e) => handleCellChange(row.id, 'unitPrice', Number(e.target.value))}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-right text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                        min="0"
                        step="0.01"
                      />
                    </td>

                    {/* Tax Amount */}
                    <td className="px-2 py-1.5 text-right">
                      <input
                        type="number"
                        value={row.taxAmount}
                        onChange={(e) => handleCellChange(row.id, 'taxAmount', Number(e.target.value))}
                        className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-right text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF]"
                        min="0"
                        step="0.01"
                      />
                    </td>

                    {/* Gross Total (Numerical column with dynamic inline data bar as specified) */}
                    <td className="px-4 py-1.5 relative text-right select-none">
                      <div className="relative w-full h-8 flex items-center justify-end font-mono text-right font-medium">
                        {/* Background track */}
                        <div className="absolute right-0 top-1 bottom-1 w-full bg-[#051C2C]/5 rounded pointer-events-none" />
                        {/* Filled bar with exact custom color accent */}
                        <div
                          className="absolute right-0 top-1 bottom-1 bg-[#2251FF]/10 rounded border-r border-[#2251FF] transition-all duration-300 pointer-events-none"
                          style={{ width: `${Math.min(100, (row.grossTotal / maxGrossTotal) * 100)}%` }}
                        />
                        <span className="relative z-10 font-bold text-[#051C2C] pr-1">
                          ${row.grossTotal.toFixed(2)}
                        </span>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="px-4 py-1.5 text-center">
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="p-1.5 text-[#888888] hover:text-[#D32F2F] hover:bg-red-50 rounded transition-all cursor-pointer inline-flex items-center justify-center"
                        title="Delete this row"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
