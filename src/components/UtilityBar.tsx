/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Save, Download, Upload, RotateCcw } from 'lucide-react';

interface UtilityBarProps {
  lastSaved: string | null;
  onExport: () => void;
  onImport: (importedData: any) => void;
  onReset: () => void;
}

export default function UtilityBar({ lastSaved, onExport, onImport, onReset }: UtilityBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.crmRows && json.customerMappings && json.productMappings) {
          onImport(json);
          // Reset file input value so same file can be uploaded again
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          alert('Invalid backup file. Missing required sheets: crmRows, customerMappings, or productMappings.');
        }
      } catch (err) {
        alert('Failed to parse backup file. Please make sure it is a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E8E8E6] py-3 px-10 sticky top-[56px] z-40 transition-all">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: System Status Info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-[#00C853] rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse"></span>
            Auto-saving active
          </div>
          <span className="text-xs text-[#888888] font-mono flex items-center gap-1">
            <Save size={12} className="text-[#888888]" />
            Last saved: <span className="text-[#051C2C] font-semibold">{lastSaved || 'Never'}</span>
          </span>
        </div>

        {/* Right Side: Operational Action Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export Backup */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#E8E8E6] rounded-md text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            title="Export full workbook data as a JSON backup file"
            id="btn-export-backup"
          >
            <Download size={13} className="text-[#2251FF]" />
            Export Backup
          </button>

          {/* Import Backup */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#E8E8E6] rounded-md text-xs font-medium text-[#051C2C] hover:bg-[#F5F5F2] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            title="Import an existing JSON backup file"
            id="btn-import-backup"
          >
            <Upload size={13} className="text-[#2251FF]" />
            Import Backup
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
            id="input-backup-file"
          />

          {/* Reset Data */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-md text-xs font-medium text-[#D32F2F] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            title="Reset current sheets back to pristine default sample records"
            id="btn-reset-data"
          >
            <RotateCcw size={13} className="text-[#D32F2F]" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
}
