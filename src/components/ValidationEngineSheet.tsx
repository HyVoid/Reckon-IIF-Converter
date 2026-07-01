/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ValidationResult } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Plus, FileSpreadsheet } from 'lucide-react';

interface ValidationEngineSheetProps {
  validationResults: ValidationResult[];
  onQuickMapCustomer: (crmCustomerName: string) => void;
  onQuickMapProduct: (crmProduct: string) => void;
}

export default function ValidationEngineSheet({
  validationResults,
  onQuickMapCustomer,
  onQuickMapProduct,
}: ValidationEngineSheetProps) {

  // Maximum gross formula total for sizing the data bars
  const maxFormulaTotal = Math.max(...validationResults.map((r) => r.formulaGrossTotal), 1);

  return (
    <div className="animate-fade-up">
      {/* Dynamic Explanation Panel */}
      <div className="insight-box p-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[#051C2C] tracking-tight mb-1">
            Real-Time Accounting Validation & Audit Engine
          </h2>
          <p className="text-xs text-[#888888]">
            This sheet re-calculates all invoices in memory and verifies account code validity. Only rows showing a{' '}
            <span className="text-[#00C853] font-bold">✅ PASS</span> status are loaded into the Reckon import file.
            Fix unmapped records instantly using the quick action buttons.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#FFFFFF] px-4 py-2 rounded-lg shadow-sm text-xs border border-[#E8E8E6] font-mono">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#00C853] rounded-full"></span>
            <span>Passed: <strong>{validationResults.filter((r) => r.status === 'PASS').length}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#D32F2F] rounded-full"></span>
            <span>Errors: <strong>{validationResults.filter((r) => r.status.startsWith('ERR')).length}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            <span>Warnings: <strong>{validationResults.filter((r) => r.status === 'WARN_DIFF').length}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center gap-2 bg-neutral-50">
          <FileSpreadsheet size={15} className="text-[#051C2C]" />
          <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
            Consolidated Validation & Rounding Ledger
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[1300px]" id="table-validation-engine">
            <thead>
              <tr className="bg-[#051C2C]/[0.04] border-b-2 border-[#051C2C]/[0.12] h-11 text-[13px]">
                <th className="w-16 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-center">Row</th>
                <th className="w-24 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Inv No</th>
                <th className="w-40 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">CRM Customer</th>
                <th className="w-44 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Reckon Client Card</th>
                <th className="w-36 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Reckon Item</th>
                <th className="w-36 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Income Account</th>
                <th className="w-24 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Tax Code</th>
                <th className="w-36 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Computed Total</th>
                <th className="w-28 px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] text-right">Diff</th>
                <th className="w-64 px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C]">Validation Verdict</th>
              </tr>
            </thead>
            <tbody>
              {validationResults.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#888888] text-xs">
                    No data to validate. Please enter or paste records in the first sheet.
                  </td>
                </tr>
              ) : (
                validationResults.map((val, index) => {
                  const isError = val.status.startsWith('ERR');
                  const isWarning = val.status === 'WARN_DIFF';

                  return (
                    <tr
                      key={val.rowId}
                      className={`border-b border-[#E8E8E6] transition-colors h-11 text-[13px] ${
                        isError ? 'anomaly-row' : 'hover:bg-[#F5F5F2]'
                      }`}
                    >
                      {/* Row index */}
                      <td className="px-4 py-2 text-[#888888] font-mono text-center">{index + 1}</td>

                      {/* Invoice No */}
                      <td className="px-3 py-2 font-mono text-[#051C2C]">{val.invoiceNo}</td>

                      {/* CRM Customer */}
                      <td className="px-3 py-2 text-[#051C2C] truncate" title={val.crmCustomer}>
                        {val.crmCustomer}
                      </td>

                      {/* Resolved Reckon Customer Name (with instant quick mapper if missing) */}
                      <td className="px-3 py-2">
                        {val.reckonCustomer ? (
                          <span className="text-[#051C2C] font-medium">{val.reckonCustomer}</span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#D32F2F] text-xs font-semibold">Unmapped Client</span>
                            <button
                              onClick={() => onQuickMapCustomer(val.crmCustomer)}
                              className="px-1.5 py-0.5 bg-[#2251FF] text-[#FFFFFF] hover:bg-[#051C2C] rounded text-[10px] font-bold flex items-center gap-0.5 cursor-pointer transition-all active:scale-90"
                              title={`Create mapping for "${val.crmCustomer}"`}
                            >
                              <Plus size={10} />
                              Map
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Resolved Reckon Item Code (with instant quick mapper if missing) */}
                      <td className="px-3 py-2">
                        {val.reckonItem ? (
                          <span className="text-[#051C2C] font-mono">{val.reckonItem}</span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#D32F2F] text-xs font-semibold">Unmapped Product</span>
                            <button
                              onClick={() => onQuickMapProduct(val.crmCustomer)} // CRM Product mapping
                              className="px-1.5 py-0.5 bg-[#2251FF] text-[#FFFFFF] hover:bg-[#051C2C] rounded text-[10px] font-bold flex items-center gap-0.5 cursor-pointer transition-all active:scale-90"
                              title="Create product mapping"
                            >
                              <Plus size={10} />
                              Map
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Ledger Account */}
                      <td className="px-3 py-2 text-[#888888] font-mono truncate">
                        {val.incomeAccount || '—'}
                      </td>

                      {/* Tax Code */}
                      <td className="px-3 py-2 text-[#888888] font-mono">
                        {val.taxCode || '—'}
                      </td>

                      {/* Computed Total with elegant inline accent data bar */}
                      <td className="px-3 py-2 relative text-right select-none">
                        <div className="relative w-full h-8 flex items-center justify-end font-mono text-right font-medium">
                          <div className="absolute right-0 top-1.5 bottom-1.5 w-full bg-[#051C2C]/5 rounded pointer-events-none" />
                          <div
                            className="absolute right-0 top-1.5 bottom-1.5 bg-[#2251FF]/10 rounded border-r border-[#2251FF] transition-all duration-300 pointer-events-none"
                            style={{ width: `${Math.min(100, (val.formulaGrossTotal / maxFormulaTotal) * 100)}%` }}
                          />
                          <span className="relative z-10 font-semibold text-[#051C2C]">
                            ${val.formulaGrossTotal.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Audit Check Difference */}
                      <td className={`px-3 py-2 text-right font-mono font-medium ${
                        Math.abs(val.totalCheckDiff) > 0.05 ? 'text-[#D32F2F] font-bold animate-pulse' : 'text-[#888888]'
                      }`}>
                        {val.totalCheckDiff === 0 ? '$0.00' : `${val.totalCheckDiff > 0 ? '+' : ''}$${val.totalCheckDiff.toFixed(2)}`}
                      </td>

                      {/* Verdict Status Badge */}
                      <td className="px-4 py-2">
                        {val.status === 'PASS' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-[#00C853] text-xs font-semibold rounded-full border border-emerald-100">
                            <CheckCircle2 size={12} />
                            PASS
                          </span>
                        )}
                        {isError && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-[#D32F2F] text-xs font-semibold rounded-full border border-red-100 animate-bounce">
                            <XCircle size={12} />
                            {val.message.replace('❌ Error: ', '')}
                          </span>
                        )}
                        {isWarning && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                            <AlertTriangle size={12} />
                            Rounding Warning (Diff &gt; $0.05)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
