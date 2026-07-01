/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CRMRow, CustomerMapping, ProductMapping, ValidationResult, IIFLine } from './types';
import { INITIAL_CRM_ROWS, INITIAL_CUSTOMER_MAPPINGS, INITIAL_PRODUCT_MAPPINGS } from './data';
import { validateData, generateIIFLines } from './utils';

import UtilityBar from './components/UtilityBar';
import CRMDataPasteSheet from './components/CRMDataPasteSheet';
import MappingTablesSheet from './components/MappingTablesSheet';
import ValidationEngineSheet from './components/ValidationEngineSheet';
import ReckonIIFOutputSheet from './components/ReckonIIFOutputSheet';
import AnalysisDashboardSheet from './components/AnalysisDashboardSheet';

import { FileSpreadsheet, Layers, BadgeCheck, FileText, BarChart3, Plus, X } from 'lucide-react';

export default function App() {
  // ─── STATE MANAGEMENT ───
  const [crmRows, setCrmRows] = useState<CRMRow[]>([]);
  const [customerMappings, setCustomerMappings] = useState<CustomerMapping[]>([]);
  const [productMappings, setProductMappings] = useState<ProductMapping[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Analysis Dashboard');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Quick Map Modals State
  const [quickMapCustomerName, setQuickMapCustomerName] = useState<string | null>(null);
  const [quickMapReckonCustName, setQuickMapReckonCustName] = useState('');
  
  const [quickMapProductName, setQuickMapProductName] = useState<string | null>(null);
  const [quickMapReckonItem, setQuickMapReckonItem] = useState('');
  const [quickMapReckonAcct, setQuickMapReckonAcct] = useState('41100-Sales');
  const [quickMapTaxCode, setQuickMapTaxCode] = useState('GST');
  const [quickMapTaxRate, setQuickMapTaxRate] = useState('10');

  // ─── INITIALIZATION ON MOUNT ───
  useEffect(() => {
    const savedData = localStorage.getItem('reckon_iif_workspace_v1');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCrmRows(parsed.crmRows || []);
        setCustomerMappings(parsed.customerMappings || []);
        setProductMappings(parsed.productMappings || []);
        setLastSaved(parsed.lastSaved || null);
      } catch (e) {
        loadSeedData();
      }
    } else {
      loadSeedData();
    }
  }, []);

  // Load Seed default samples
  const loadSeedData = () => {
    setCrmRows(INITIAL_CRM_ROWS);
    setCustomerMappings(INITIAL_CUSTOMER_MAPPINGS);
    setProductMappings(INITIAL_PRODUCT_MAPPINGS);
    
    const nowStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dateStr = new Date().toISOString().split('T')[0];
    setLastSaved(`${dateStr} ${nowStr}`);
  };

  // ─── AUTO SAVE TRIGGERS ───
  useEffect(() => {
    // Avoid saving empty state on very first render before mount effect resolves
    if (crmRows.length === 0 && customerMappings.length === 0 && productMappings.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      const nowStr = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const dateStr = new Date().toISOString().split('T')[0];
      const timestamp = `${dateStr} ${nowStr}`;

      const payload = {
        crmRows,
        customerMappings,
        productMappings,
        lastSaved: timestamp,
      };

      localStorage.setItem('reckon_iif_workspace_v1', JSON.stringify(payload));
      setLastSaved(timestamp);
    }, 800); // Debounce saves by 800ms to preserve performance

    return () => clearTimeout(timer);
  }, [crmRows, customerMappings, productMappings]);

  // ─── COMPUTED REAL-TIME FORMULA LOGIC ───
  // Calculate validation outcomes instantly!
  const validationResults: ValidationResult[] = validateData(crmRows, customerMappings, productMappings);

  // Generate IIF transactions instantly!
  const iifLines: IIFLine[] = generateIIFLines(validationResults, crmRows);

  // ─── GLOBAL CONTROLS ───
  const handleExportBackup = () => {
    const payload = {
      crmRows,
      customerMappings,
      productMappings,
      version: '1.0',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reckon_iif_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (json: any) => {
    setCrmRows(json.crmRows || []);
    setCustomerMappings(json.customerMappings || []);
    setProductMappings(json.productMappings || []);
    
    const nowStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dateStr = new Date().toISOString().split('T')[0];
    setLastSaved(`${dateStr} ${nowStr}`);
    alert('Backup file loaded successfully!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset workspace? This will overwrite your current edits with the default sample data.')) {
      loadSeedData();
    }
  };

  // ─── QUICK MAP DIALOG SUBMISSIONS ───
  const submitQuickCustomerMap = () => {
    if (!quickMapCustomerName || !quickMapReckonCustName.trim()) return;

    const newRule: CustomerMapping = {
      id: `cust-map-${Date.now()}`,
      crmCustomerName: quickMapCustomerName,
      reckonCustomerName: quickMapReckonCustName.trim(),
    };

    setCustomerMappings([...customerMappings, newRule]);
    setQuickMapCustomerName(null);
    setQuickMapReckonCustName('');
  };

  const submitQuickProductMap = () => {
    if (!quickMapProductName || !quickMapReckonItem.trim()) return;

    const pct = parseFloat(quickMapTaxRate);
    const resolvedRate = isNaN(pct) ? 0 : Number((pct / 100).toFixed(4));

    const newRule: ProductMapping = {
      id: `prod-map-${Date.now()}`,
      crmProduct: quickMapProductName,
      reckonItem: quickMapReckonItem.trim(),
      reckonIncomeAcct: quickMapReckonAcct.trim(),
      reckonTaxCode: quickMapTaxCode.trim(),
      taxRate: resolvedRate,
    };

    setProductMappings([...productMappings, newRule]);
    setQuickMapProductName(null);
    setQuickMapReckonItem('');
    setQuickMapReckonAcct('41100-Sales');
    setQuickMapTaxCode('GST');
    setQuickMapTaxRate('10');
  };

  // ─── NAVIGATION CONFIGS ───
  const tabs = [
    { name: 'Analysis Dashboard', icon: <BarChart3 size={15} /> },
    { name: 'CRM Data Paste', icon: <FileSpreadsheet size={15} /> },
    { name: 'Mapping Tables', icon: <Layers size={15} /> },
    { name: 'Validation Engine', icon: <BadgeCheck size={15} /> },
    { name: 'Reckon IIF Output', icon: <FileText size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#051C2C] pb-20 relative">
      {/* ─── STICKY TOP NAVIGATION BAR (56px) ─── */}
      <nav className="h-[56px] bg-[#FFFFFF] border-b border-[#E8E8E6] px-10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          {/* Brand Logo Identity */}
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold tracking-tight text-[#051C2C]">
              RECKON <span className="text-[#2251FF]">IIF</span> CONVERTER
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-[#051C2C] text-[#FFFDE7]">
              SaaS Engine
            </span>
          </div>

          {/* Navigation Tab list */}
          <div className="flex h-full items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`h-full px-4 flex items-center gap-2 text-xs font-semibold tracking-wide border-b-3 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'border-[#2251FF] text-[#2251FF] bg-[#2251FF]/[0.02]'
                      : 'border-transparent text-[#051C2C]/60 hover:text-[#051C2C] hover:bg-neutral-50'
                  }`}
                  id={`tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── SECONDARY UTILITY STATE BAR ─── */}
      <UtilityBar
        lastSaved={lastSaved}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        onReset={handleResetData}
      />

      {/* ─── MAIN CONTENT CONTAINER (MAX 1400px, 40px left/right margins) ─── */}
      <main className="max-w-[1400px] mx-auto px-10 pt-8">
        {/* Active Tab View Router */}
        {activeTab === 'Analysis Dashboard' && (
          <AnalysisDashboardSheet
            validationResults={validationResults}
            onQuickMapCustomer={(name) => {
              setQuickMapCustomerName(name);
              setQuickMapReckonCustName(name);
            }}
            onQuickMapProduct={(name) => {
              setQuickMapProductName(name);
              setQuickMapReckonItem(name.replace(/\s+/g, '-').toUpperCase());
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'CRM Data Paste' && (
          <CRMDataPasteSheet crmRows={crmRows} onChange={setCrmRows} />
        )}

        {activeTab === 'Mapping Tables' && (
          <MappingTablesSheet
            customerMappings={customerMappings}
            productMappings={productMappings}
            onCustomerChange={setCustomerMappings}
            onProductChange={setProductMappings}
          />
        )}

        {activeTab === 'Validation Engine' && (
          <ValidationEngineSheet
            validationResults={validationResults}
            onQuickMapCustomer={(name) => {
              setQuickMapCustomerName(name);
              setQuickMapReckonCustName(name);
            }}
            onQuickMapProduct={(name) => {
              // Retrieve the first unmapped row's product name associated with this missing customer, or fallback
              const offendingRow = crmRows.find((r) => r.customerName === name && !productMappings.some((p) => p.crmProduct === r.productName));
              const prodName = offendingRow ? offendingRow.productName : name;
              setQuickMapProductName(prodName);
              setQuickMapReckonItem(prodName.replace(/\s+/g, '-').toUpperCase() + '-01');
            }}
          />
        )}

        {activeTab === 'Reckon IIF Output' && (
          <ReckonIIFOutputSheet iifLines={iifLines} validationResults={validationResults} />
        )}
      </main>

      {/* ─── QUICK MAP CUSTOMER POPUP DIALOG ─── */}
      {quickMapCustomerName && (
        <div className="fixed inset-0 bg-[#051C2C]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
          <div className="bg-[#FFFFFF] rounded-xl shadow-lg w-full max-w-md p-6 relative border-t-4 border-[#2251FF]">
            <button
              onClick={() => setQuickMapCustomerName(null)}
              className="absolute top-4 right-4 p-1.5 text-[#888888] hover:text-[#051C2C] hover:bg-neutral-100 rounded-md transition-all cursor-pointer"
            >
              <X size={15} />
            </button>
            <h3 className="font-heading text-lg font-bold text-[#051C2C] mb-1">
              Quick Translate Client Name
            </h3>
            <p className="text-xs text-[#888888] mb-4">
              Enter the exact matching name configured in your Reckon Accounts ledger card.
            </p>

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                  CRM Original Value
                </label>
                <div className="w-full bg-neutral-100 border border-neutral-200 rounded p-2 text-xs font-mono font-bold text-[#051C2C]">
                  {quickMapCustomerName}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                  Reckon Accounts Equivalent Name
                </label>
                <input
                  type="text"
                  value={quickMapReckonCustName}
                  onChange={(e) => setQuickMapReckonCustName(e.target.value)}
                  className="w-full bg-[#FFFDE7] border border-[#E8E8E6] rounded p-2 text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-[#FFFFFF]"
                  placeholder="e.g. Acme Corporation (ACME-01)"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setQuickMapCustomerName(null)}
                className="px-3 py-1.5 border border-[#E8E8E6] rounded-md text-[#888888] hover:bg-neutral-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitQuickCustomerMap}
                disabled={!quickMapReckonCustName.trim()}
                className="px-4 py-1.5 bg-[#2251FF] hover:bg-[#051C2C] disabled:bg-[#888888] text-[#FFFFFF] rounded-md font-semibold cursor-pointer transition-all active:scale-95"
              >
                Create Map Rule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── QUICK MAP PRODUCT POPUP DIALOG ─── */}
      {quickMapProductName && (
        <div className="fixed inset-0 bg-[#051C2C]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
          <div className="bg-[#FFFFFF] rounded-xl shadow-lg w-full max-w-md p-6 relative border-t-4 border-[#2251FF]">
            <button
              onClick={() => setQuickMapProductName(null)}
              className="absolute top-4 right-4 p-1.5 text-[#888888] hover:text-[#051C2C] hover:bg-neutral-100 rounded-md transition-all cursor-pointer"
            >
              <X size={15} />
            </button>
            <h3 className="font-heading text-lg font-bold text-[#051C2C] mb-1">
              Quick Translate Product & Accounts
            </h3>
            <p className="text-xs text-[#888888] mb-4">
              Map this original CRM product item code, ledger sales account, and tax rates.
            </p>

            <div className="space-y-4 mb-5 max-h-[380px] overflow-y-auto pr-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                  CRM Original Product
                </label>
                <div className="w-full bg-neutral-100 border border-neutral-200 rounded p-2 text-xs font-mono font-bold text-[#051C2C]">
                  {quickMapProductName}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                  Reckon Item Code
                </label>
                <input
                  type="text"
                  value={quickMapReckonItem}
                  onChange={(e) => setQuickMapReckonItem(e.target.value)}
                  className="w-full bg-[#FFFDE7] border border-[#E8E8E6] rounded p-2 text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-[#FFFFFF]"
                  placeholder="e.g. SVC-SUP-01"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                  Sales Income Account
                </label>
                <input
                  type="text"
                  value={quickMapReckonAcct}
                  onChange={(e) => setQuickMapReckonAcct(e.target.value)}
                  className="w-full bg-[#FFFDE7] border border-[#E8E8E6] rounded p-2 text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-[#FFFFFF]"
                  placeholder="e.g. 41100-Sales"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                    Tax Code
                  </label>
                  <input
                    type="text"
                    value={quickMapTaxCode}
                    onChange={(e) => setQuickMapTaxCode(e.target.value)}
                    className="w-full bg-[#FFFDE7] border border-[#E8E8E6] rounded p-2 text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-[#FFFFFF]"
                    placeholder="e.g. GST"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#888888] mb-1 font-mono">
                    Rate (%)
                  </label>
                  <input
                    type="number"
                    value={quickMapTaxRate}
                    onChange={(e) => setQuickMapTaxRate(e.target.value)}
                    className="w-full bg-[#FFFDE7] border border-[#E8E8E6] rounded p-2 text-xs text-[#051C2C] focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-[#FFFFFF]"
                    placeholder="e.g. 10"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setQuickMapProductName(null)}
                className="px-3 py-1.5 border border-[#E8E8E6] rounded-md text-[#888888] hover:bg-neutral-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitQuickProductMap}
                disabled={!quickMapReckonItem.trim() || !quickMapReckonAcct.trim()}
                className="px-4 py-1.5 bg-[#2251FF] hover:bg-[#051C2C] disabled:bg-[#888888] text-[#FFFFFF] rounded-md font-semibold cursor-pointer transition-all active:scale-95"
              >
                Create Map Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
