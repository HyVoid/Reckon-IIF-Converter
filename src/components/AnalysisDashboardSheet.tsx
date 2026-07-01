/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ValidationResult } from '../types';
import { TrendingUp, AlertOctagon, HelpCircle, Activity, PiggyBank, BadgeCheck, Plus } from 'lucide-react';

interface AnalysisDashboardSheetProps {
  validationResults: ValidationResult[];
  onQuickMapCustomer: (crmCustomerName: string) => void;
  onQuickMapProduct: (crmProduct: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function AnalysisDashboardSheet({
  validationResults,
  onQuickMapCustomer,
  onQuickMapProduct,
  setActiveTab,
}: AnalysisDashboardSheetProps) {

  // Metrics Calculations
  const totalInvoices = new Set(validationResults.map((r) => r.invoiceNo)).size;
  const passedRows = validationResults.filter((r) => r.status === 'PASS');
  const passedInvoicesCount = new Set(passedRows.map((r) => r.invoiceNo)).size;
  const passRatePct = totalInvoices > 0 ? (passedInvoicesCount / totalInvoices) * 100 : 0;

  // Passed Accounts Receivable sum (Debit)
  const passedTotalAR = passedRows.reduce((sum, r) => sum + r.formulaGrossTotal, 0);

  // Error Rows
  const errorRows = validationResults.filter((r) => r.status.startsWith('ERR'));
  const errorCount = errorRows.length;

  // Warning Rows
  const warningRows = validationResults.filter((r) => r.status === 'WARN_DIFF');
  const warningCount = warningRows.length;

  // Revenue by Sales Account (Subledger Breakdown)
  const accountRevenueMap: Record<string, number> = {};
  passedRows.forEach((row) => {
    const acct = row.incomeAccount || 'Unassigned Income';
    const amount = row.formulaGrossTotal - (row.formulaGrossTotal * (row.taxRate / (1 + row.taxRate))); // Approx net
    accountRevenueMap[acct] = (accountRevenueMap[acct] || 0) + amount;
  });

  const accounts = Object.keys(accountRevenueMap).map((acct) => ({
    name: acct,
    value: accountRevenueMap[acct],
  }));
  const maxAccountRevenue = Math.max(...accounts.map((a) => a.value), 1);

  // Distinct missing customers & products
  const missingCustomers = Array.from(
    new Set(
      validationResults
        .filter((r) => r.status === 'ERR_CUSTOMER')
        .map((r) => r.crmCustomer)
    )
  );

  const missingProducts = Array.from(
    new Set(
      validationResults
        .filter((r) => r.status === 'ERR_PRODUCT')
        .map((r) => r.crmCustomer) // The item unmapped is bound to the row product
    )
  );

  return (
    <div className="animate-fade-up">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8" id="kpi-grid">
        {/* Total Invoices */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <span className="text-[11px] uppercase tracking-[0.05em] font-semibold text-[#888888] font-sans">
            Total Invoices
          </span>
          <span className="font-heading text-[36px] font-bold text-[#051C2C] tracking-[-0.03em] leading-none my-2">
            {totalInvoices}
          </span>
          <span className="text-xs text-[#888888] font-medium flex items-center gap-1">
            <Activity size={12} />
            Distinct invoice numbers
          </span>
        </div>

        {/* Pass Rate */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <span className="text-[11px] uppercase tracking-[0.05em] font-semibold text-[#888888] font-sans">
            Validation Pass Rate
          </span>
          <span className={`font-heading text-[36px] font-bold tracking-[-0.03em] leading-none my-2 ${
            passRatePct < 100 ? 'text-[#D32F2F]' : 'text-[#00C853]'
          }`}>
            {passRatePct.toFixed(1)}%
          </span>
          <span className="text-xs text-[#888888] font-medium flex items-center gap-1">
            <TrendingUp size={12} />
            {passedInvoicesCount} of {totalInvoices} invoices verified
          </span>
        </div>

        {/* Total Value Passed */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <span className="text-[11px] uppercase tracking-[0.05em] font-semibold text-[#888888] font-sans">
            Passed Accounts Receivable
          </span>
          <span className="font-heading text-[36px] font-bold text-[#2251FF] tracking-[-0.03em] leading-none my-2">
            ${passedTotalAR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-[#888888] font-medium flex items-center gap-1">
            <PiggyBank size={12} />
            Total debits ready to export
          </span>
        </div>

        {/* Flagged Errors */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <span className="text-[11px] uppercase tracking-[0.05em] font-semibold text-[#888888] font-sans">
            Flagged Deficits
          </span>
          <span className={`font-heading text-[36px] font-bold tracking-[-0.03em] leading-none my-2 ${
            errorCount > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'
          }`}>
            {errorCount}
          </span>
          <span className={`text-xs font-medium flex items-center gap-1 ${
            errorCount > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'
          }`}>
            <AlertOctagon size={12} />
            {errorCount > 0 ? 'Requires immediate action' : 'All master data translated'}
          </span>
        </div>

        {/* Flagged Warnings */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <span className="text-[11px] uppercase tracking-[0.05em] font-semibold text-[#888888] font-sans">
            Ledger Discrepancies
          </span>
          <span className={`font-heading text-[36px] font-bold tracking-[-0.03em] leading-none my-2 ${
            warningCount > 0 ? 'text-amber-600' : 'text-[#888888]'
          }`}>
            {warningCount}
          </span>
          <span className="text-xs text-[#888888] font-medium flex items-center gap-1">
            <HelpCircle size={12} />
            Rounding tail warning &gt; $0.05
          </span>
        </div>
      </div>

      {/* Structured Business Insights Panel (uses specific 3px accent border + 4% opacity background) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Operational Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-heading text-lg font-semibold text-[#051C2C] tracking-tight mb-3">
            Accounting Executive Insights & Actions
          </h3>

          {/* Condition 1: Missing Mappings */}
          {errorCount > 0 && (
            <div className="insight-box p-5 border-l-3 border-[#2251FF]">
              <h4 className="font-heading text-sm font-semibold text-[#051C2C] mb-1">
                ⚠️ Operational Alert: Master Data Translation Gap
              </h4>
              <p className="text-xs text-[#1A1A2E] leading-relaxed">
                There are <strong>{errorCount} invoice row(s)</strong> that failed client or product mapping.
                Because of these missing ledger pointers, an un-reconciled volume of{' '}
                <span className="font-bold text-[#D32F2F]">
                  $
                  {validationResults
                    .filter((r) => r.status.startsWith('ERR'))
                    .reduce((sum, r) => sum + r.formulaGrossTotal, 0)
                    .toFixed(2)}
                </span>{' '}
                cannot be loaded into Reckon. Adding these translations is required.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setActiveTab('Mapping Tables')}
                  className="px-2.5 py-1 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Configure Mappings
                </button>
              </div>
            </div>
          )}

          {/* Condition 2: Rounding Warning */}
          {warningCount > 0 && (
            <div className="insight-box p-5 border-l-3 border-amber-500 bg-amber-50/[0.3]">
              <h4 className="font-heading text-sm font-semibold text-[#051C2C] mb-1">
                ⚡ Audit Advisory: Subledger Rounding Tolerance
              </h4>
              <p className="text-xs text-[#1A1A2E] leading-relaxed">
                We detected <strong>{warningCount} record(s)</strong> (such as row #{' '}
                {validationResults.findIndex((r) => r.status === 'WARN_DIFF') + 1}) where the CRM calculated tax
                amount or gross total deviates from the standard ledger formula by more than <strong>$0.05</strong>.
                Double-check CRM calculations to prevent tax subledger auditing flags.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setActiveTab('Validation Engine')}
                  className="px-2.5 py-1 border border-amber-600 hover:bg-amber-100 text-amber-800 rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Inspect Rounding Gaps
                </button>
              </div>
            </div>
          )}

          {/* Condition 3: Workspace is fully balanced */}
          {errorCount === 0 && warningCount === 0 && totalInvoices > 0 && (
            <div className="insight-box p-5 border-l-3 border-[#00C853] bg-emerald-50/[0.2]">
              <h4 className="font-heading text-sm font-semibold text-[#051C2C] mb-1">
                🏆 Workspace Balanced & Reconciled
              </h4>
              <p className="text-xs text-[#1A1A2E] leading-relaxed">
                Great job! <strong>100% of CRM invoice lines</strong> have successfully resolved against active
                mappings. A total accounts receivable volume of{' '}
                <span className="font-bold text-[#00C853]">${passedTotalAR.toFixed(2)}</span> is mapped, balanced,
                and completely safe to export into Reckon.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setActiveTab('Reckon IIF Output')}
                  className="px-2.5 py-1 bg-[#00C853] text-[#FFFFFF] hover:bg-[#051C2C] rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Go to Export Output
                </button>
              </div>
            </div>
          )}

          {/* Empty State Help */}
          {totalInvoices === 0 && (
            <div className="insight-box p-5">
              <h4 className="font-heading text-sm font-semibold text-[#051C2C] mb-1">
                No active records loaded
              </h4>
              <p className="text-xs text-[#1A1A2E] leading-relaxed">
                Please paste your CRM invoice rows in the first sheet. Samples are pre-loaded by clicking "Reset Data" at the top right of your workspace.
              </p>
            </div>
          )}

          {/* Missing Translations Shortcuts */}
          {errorCount > 0 && (
            <div className="bg-[#FFFFFF] border border-[#E8E8E6] rounded-xl p-5 shadow-sm">
              <h4 className="font-heading text-sm font-semibold text-[#051C2C] mb-3">
                Actionable Translation Gaps List
              </h4>

              <div className="space-y-3">
                {missingCustomers.map((cust) => (
                  <div
                    key={cust}
                    className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-neutral-100 hover:scale-[1.01] transition-all"
                  >
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#888888] font-mono">
                        Customer Translation
                      </span>
                      <p className="text-xs font-bold text-[#051C2C]">{cust}</p>
                    </div>
                    <button
                      onClick={() => onQuickMapCustomer(cust)}
                      className="px-2 py-1 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      Add Map Rule
                    </button>
                  </div>
                ))}

                {missingProducts.map((prod) => (
                  <div
                    key={prod}
                    className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-neutral-100 hover:scale-[1.01] transition-all"
                  >
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#888888] font-mono">
                        Product Translation
                      </span>
                      <p className="text-xs font-bold text-[#051C2C]">{prod}</p>
                    </div>
                    <button
                      onClick={() => onQuickMapProduct(prod)}
                      className="px-2 py-1 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      Add Map Rule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Subledger Chart */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl p-6 shadow-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
              Subledger Sales Allocation Volume
            </h3>
            <p className="text-[11px] text-[#888888] mb-5">
              Net revenue allocated across active Reckon Income Accounts (validated records only)
            </p>

            {accounts.length === 0 ? (
              <div className="py-12 text-center text-[#888888] text-xs">
                No validated sales allocation to display. Add mappings to balance the charts.
              </div>
            ) : (
              <div className="space-y-5">
                {accounts.map((acct) => (
                  <div key={acct.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#051C2C] font-mono truncate max-w-[200px]" title={acct.name}>
                        {acct.name}
                      </span>
                      <span className="font-mono font-bold text-[#2251FF]">
                        ${acct.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Styled Data bar indicator */}
                    <div className="w-full h-3 bg-[#051C2C]/5 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#051C2C] to-[#2251FF] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (acct.value / maxAccountRevenue) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-5 border-t border-[#E8E8E6] flex items-center justify-between text-[#888888] text-xs">
            <span className="flex items-center gap-1">
              <BadgeCheck size={14} className="text-[#00C853]" />
              Standard ledger audit compliant
            </span>
            <span className="font-mono">Reckon Acc. IIF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
