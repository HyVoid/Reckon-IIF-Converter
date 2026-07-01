/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IIFLine, ValidationResult } from '../types';
import { exportToIIFText } from '../utils';
import { Download, Copy, Check, FileCheck, HelpCircle, FileWarning } from 'lucide-react';

interface ReckonIIFOutputSheetProps {
  iifLines: IIFLine[];
  validationResults: ValidationResult[];
}

export default function ReckonIIFOutputSheet({ iifLines, validationResults }: ReckonIIFOutputSheetProps) {
  const [copied, setCopied] = useState(false);

  const passedCount = validationResults.filter((r) => r.status === 'PASS').length;
  const totalCount = validationResults.length;
  const excludedCount = totalCount - passedCount;

  // Convert Lines to raw text
  const rawIIFText = exportToIIFText(iifLines);

  const handleDownload = () => {
    if (iifLines.length === 0) {
      alert('There is no validated data to download. Please resolve errors first.');
      return;
    }
    const blob = new Blob([rawIIFText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reckon_import.iif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (iifLines.length === 0) return;
    navigator.clipboard.writeText(rawIIFText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-up">
      {/* Informative Header with status alerts */}
      <div className="insight-box p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[#051C2C] tracking-tight mb-1">
            Reckon Systems Intuit IIF Document Output
          </h2>
          <p className="text-xs text-[#888888]">
            This output strictly adheres to the QuickBooks/Reckon Transaction Import Format (.IIF).
            It structures each invoice as a triple-tier ledger balance: TRNS (Debitor AR), SPL (Creditor Sales Revenue), and ENDTRNS (EOT).
          </p>
        </div>
        <div className="flex gap-2">
          {iifLines.length > 0 && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E8E8E6] hover:bg-[#F5F5F2] text-[#051C2C] rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95"
                id="btn-copy-iif"
              >
                {copied ? <Check size={13} className="text-[#00C853]" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy Raw Text'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 hover:scale-[1.03] active:scale-95"
                id="btn-download-iif"
              >
                <Download size={13} />
                Download .IIF File
              </button>
            </>
          )}
        </div>
      </div>

      {/* Warnings & Alerts regarding exclusions */}
      {excludedCount > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 flex items-start gap-3">
          <FileWarning size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">
              {excludedCount} Invoice(s) Excluded due to mapping gaps
            </h4>
            <p className="text-xs text-amber-700 mt-1">
              Currently, {excludedCount} of {totalCount} records are not marked as <span className="font-bold">✅ PASS</span>. Only verified records have been extracted. Please visit the <strong>Validation Engine</strong> sheet to add mappings for unmapped names to resolve this.
            </p>
          </div>
        </div>
      )}

      {/* Grid Splits: Visual Grid vs Text File representation */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Grid: Visual Layout */}
        <div className="xl:col-span-7 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden flex flex-col self-start transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <div className="px-6 py-4 border-b border-[#E8E8E6] bg-neutral-50 flex items-center gap-2">
            <FileCheck size={15} className="text-[#00C853]" />
            <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
              IIF Output Matrix ({iifLines.length} Ledger Rows Generated)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="table-iif-output-grid">
              <thead>
                <tr className="bg-[#051C2C]/[0.04] border-b-2 border-[#051C2C]/[0.12] h-10 text-[11px]">
                  <th className="px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[15%]">Type</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[15%]">Doc No</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[15%]">Date</th>
                  <th className="px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[25%]">Ledger Account</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[15%] text-right">Amount</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[10%]">Tax Code</th>
                </tr>
              </thead>
              <tbody>
                {iifLines.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#888888] text-xs">
                      No records are validated. Please resolve errors in mapping first to yield IIF outputs.
                    </td>
                  </tr>
                ) : (
                  iifLines.map((line, index) => {
                    const isTrns = line.lineType === 'TRNS';
                    const isSpl = line.lineType === 'SPL';
                    const isEnd = line.lineType === 'ENDTRNS';

                    return (
                      <tr
                        key={index}
                        className={`border-b border-[#E8E8E6] text-xs h-9 transition-colors hover:bg-neutral-50 ${
                          isEnd ? 'text-neutral-400 bg-[#051C2C]/[0.01]' : 'text-[#051C2C]'
                        }`}
                      >
                        {/* Line Type */}
                        <td className="px-4 py-1.5 font-bold font-mono">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] ${
                              isTrns
                                ? 'bg-indigo-50 text-indigo-700'
                                : isSpl
                                ? 'bg-[#FFFDE7] text-amber-700'
                                : 'bg-neutral-100 text-neutral-500'
                            }`}
                          >
                            {line.lineType}
                          </span>
                        </td>

                        {/* Doc Number */}
                        <td className="px-3 py-1.5 font-mono">{line.docNum}</td>

                        {/* Date */}
                        <td className="px-3 py-1.5 font-mono">{line.date}</td>

                        {/* Account */}
                        <td className="px-4 py-1.5 font-medium truncate" title={line.accnt}>
                          {line.accnt || <span className="text-neutral-300"> — </span>}
                        </td>

                        {/* Amount */}
                        <td className={`px-3 py-1.5 text-right font-mono font-semibold ${
                          isSpl ? 'text-[#D32F2F]' : 'text-[#00C853]'
                        }`}>
                          {line.amount ? (isSpl ? line.amount : `+${line.amount}`) : ' — '}
                        </td>

                        {/* Tax Code */}
                        <td className="px-3 py-1.5 font-mono">{line.taxCode || ' — '}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Grid: Text/TSV Preview */}
        <div className="xl:col-span-5 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <div className="px-6 py-4 border-b border-[#E8E8E6] bg-neutral-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <HelpCircle size={14} className="text-[#888888]" />
              <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
                IIF Import Text File Preview
              </h3>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-neutral-100 rounded text-[#888888] font-bold">
              Tab-Delimited (TSV)
            </span>
          </div>

          {/* TSV Text Display Box */}
          <div className="p-4 flex-1 flex flex-col min-h-[350px]">
            {iifLines.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center text-[#888888] text-xs p-8 bg-neutral-50 rounded border border-dashed border-[#E8E8E6]">
                Configure and validate invoice data to generate raw import text here.
              </div>
            ) : (
              <pre
                className="flex-1 w-full bg-[#051C2C] text-[#FFFDE7] p-4 rounded font-mono text-[11px] overflow-auto select-all max-h-[500px]"
                id="pre-iif-raw-text"
              >
                {rawIIFText}
              </pre>
            )}
            <p className="text-[11px] text-[#888888] mt-3 leading-tight">
              * The preview above illustrates the literal TSV syntax. Click "Download .IIF File" to retrieve the formatted spreadsheet document, then load it directly into Reckon Accounting using: <br />
              <strong className="text-[#051C2C]">File → Utilities → Import → IIF Files</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
