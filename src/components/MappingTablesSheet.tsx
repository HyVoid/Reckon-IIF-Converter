/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CustomerMapping, ProductMapping } from '../types';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface MappingTablesSheetProps {
  customerMappings: CustomerMapping[];
  productMappings: ProductMapping[];
  onCustomerChange: (mappings: CustomerMapping[]) => void;
  onProductChange: (mappings: ProductMapping[]) => void;
}

export default function MappingTablesSheet({
  customerMappings,
  productMappings,
  onCustomerChange,
  onProductChange,
}: MappingTablesSheetProps) {

  // Customer Mapping Handlers
  const handleCustomerCellChange = (id: string, field: keyof CustomerMapping, value: string) => {
    const updated = customerMappings.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onCustomerChange(updated);
  };

  const addCustomerMapping = () => {
    const newItem: CustomerMapping = {
      id: `cust-map-${Date.now()}-${Math.random()}`,
      crmCustomerName: '',
      reckonCustomerName: '',
    };
    onCustomerChange([...customerMappings, newItem]);
  };

  const deleteCustomerMapping = (id: string) => {
    onCustomerChange(customerMappings.filter((item) => item.id !== id));
  };

  // Product Mapping Handlers
  const handleProductCellChange = (id: string, field: keyof ProductMapping, value: any) => {
    const updated = productMappings.map((item) => {
      if (item.id === id) {
        let parsedVal = value;
        if (field === 'taxRate') {
          // Convert input percent (e.g. 10) back to raw float rate (e.g. 0.10)
          const pct = parseFloat(value);
          parsedVal = isNaN(pct) ? 0 : Number((pct / 100).toFixed(4));
        }
        return { ...item, [field]: parsedVal };
      }
      return item;
    });
    onProductChange(updated);
  };

  const addProductMapping = () => {
    const newItem: ProductMapping = {
      id: `prod-map-${Date.now()}-${Math.random()}`,
      crmProduct: '',
      reckonItem: '',
      reckonIncomeAcct: '',
      reckonTaxCode: 'GST',
      taxRate: 0.10,
    };
    onProductChange([...productMappings, newItem]);
  };

  const deleteProductMapping = (id: string) => {
    onProductChange(productMappings.filter((item) => item.id !== id));
  };

  return (
    <div className="animate-fade-up">
      {/* Information Header Block */}
      <div className="insight-box p-5 mb-8">
        <h2 className="font-heading text-lg font-semibold text-[#051C2C] tracking-tight mb-1">
          Master Data Dictionary & Account Mappings
        </h2>
        <p className="text-xs text-[#888888]">
          Configure exact translations between CRM entities and Reckon Accounting objects.
          These mapping tables act as your account system rules. The Validation Engine reads these mappings to check, re-calculate, and construct valid IIF records automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Grid: Customer Mapping */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden flex flex-col self-start transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-neutral-50">
            <div>
              <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
                Customer Name Translation
              </h3>
              <p className="text-[11px] text-[#888888]">CRM Customer → Reckon System Client</p>
            </div>
            <button
              onClick={addCustomerMapping}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 hover:scale-[1.04] active:scale-95"
              id="btn-add-customer-mapping"
            >
              <Plus size={12} />
              Add Rule
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="table-customer-mapping">
              <thead>
                <tr className="bg-[#051C2C]/[0.04] border-b-2 border-[#051C2C]/[0.12] h-10 text-[11px]">
                  <th className="px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[45%]">
                    CRM Original Name
                  </th>
                  <th className="px-4 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[45%]">
                    Reckon Customer Card
                  </th>
                  <th className="px-4 py-2 text-center uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[10%]">
                    Del
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerMappings.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-[#888888] text-xs">
                      No customer rules declared. Click "Add Rule" to begin.
                    </td>
                  </tr>
                ) : (
                  customerMappings.map((map) => (
                    <tr
                      key={map.id}
                      className="border-b border-[#E8E8E6] hover:bg-[#F5F5F2] h-9 text-xs transition-colors"
                    >
                      {/* CRM Name */}
                      <td className="px-2 py-1">
                        <input
                          type="text"
                          value={map.crmCustomerName}
                          onChange={(e) => handleCustomerCellChange(map.id, 'crmCustomerName', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. Acme Corp"
                        />
                      </td>

                      {/* Reckon Name */}
                      <td className="px-2 py-1">
                        <input
                          type="text"
                          value={map.reckonCustomerName}
                          onChange={(e) => handleCustomerCellChange(map.id, 'reckonCustomerName', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. Acme Corporation (ACME-01)"
                        />
                      </td>

                      {/* Delete */}
                      <td className="px-2 py-1 text-center">
                        <button
                          onClick={() => deleteCustomerMapping(map.id)}
                          className="p-1.5 text-[#888888] hover:text-[#D32F2F] hover:bg-red-50 rounded transition-all cursor-pointer inline-flex items-center justify-center hover:scale-[1.08]"
                          title="Delete mapping rule"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Grid: Product/Item Mapping */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden flex flex-col self-start transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
          <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-neutral-50">
            <div>
              <h3 className="font-heading text-base font-semibold text-[#051C2C] tracking-tight">
                Product, Sales Account & Tax Mapping
              </h3>
              <p className="text-[11px] text-[#888888]">CRM Product → Reckon Item, Ledger Account, Tax Code, Tax Rate</p>
            </div>
            <button
              onClick={addProductMapping}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#2251FF] hover:bg-[#051C2C] text-[#FFFFFF] rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 hover:scale-[1.04] active:scale-95"
              id="btn-add-product-mapping"
            >
              <Plus size={12} />
              Add Rule
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="table-product-mapping">
              <thead>
                <tr className="bg-[#051C2C]/[0.04] border-b-2 border-[#051C2C]/[0.12] h-10 text-[11px]">
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[25%]">CRM Product</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[20%]">Reckon Item</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[25%]">Sales Account</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[15%]">Tax Code</th>
                  <th className="px-3 py-2 uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[10%] text-right">Rate %</th>
                  <th className="px-3 py-2 text-center uppercase tracking-[0.06em] font-semibold text-[#051C2C] w-[5%]">Del</th>
                </tr>
              </thead>
              <tbody>
                {productMappings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#888888] text-xs">
                      No product rules declared. Click "Add Rule" to begin.
                    </td>
                  </tr>
                ) : (
                  productMappings.map((map) => (
                    <tr
                      key={map.id}
                      className="border-b border-[#E8E8E6] hover:bg-[#F5F5F2] h-9 text-xs transition-colors"
                    >
                      {/* CRM Product */}
                      <td className="px-1.5 py-1">
                        <input
                          type="text"
                          value={map.crmProduct}
                          onChange={(e) => handleProductCellChange(map.id, 'crmProduct', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. SaaS Pro License"
                        />
                      </td>

                      {/* Reckon Item */}
                      <td className="px-1.5 py-1">
                        <input
                          type="text"
                          value={map.reckonItem}
                          onChange={(e) => handleProductCellChange(map.id, 'reckonItem', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. PRO-LIC-01"
                        />
                      </td>

                      {/* Income Account */}
                      <td className="px-1.5 py-1">
                        <input
                          type="text"
                          value={map.reckonIncomeAcct}
                          onChange={(e) => handleProductCellChange(map.id, 'reckonIncomeAcct', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. 41100-Sales"
                        />
                      </td>

                      {/* Tax Code */}
                      <td className="px-1.5 py-1">
                        <input
                          type="text"
                          value={map.reckonTaxCode}
                          onChange={(e) => handleProductCellChange(map.id, 'reckonTaxCode', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-[#051C2C] focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          placeholder="e.g. GST"
                        />
                      </td>

                      {/* Tax Rate % */}
                      <td className="px-1.5 py-1 text-right">
                        <input
                          type="number"
                          value={Number((map.taxRate * 100).toFixed(2))}
                          onChange={(e) => handleProductCellChange(map.id, 'taxRate', e.target.value)}
                          className="w-full bg-[#FFFDE7] border border-transparent rounded px-2 py-1 text-right text-[#051C2C] font-mono focus:outline-none focus:border-[#2251FF] focus:bg-[#FFFFFF] transition-all hover:scale-[1.02]"
                          step="0.1"
                          min="0"
                          max="100"
                        />
                      </td>

                      {/* Delete */}
                      <td className="px-1.5 py-1 text-center">
                        <button
                          onClick={() => deleteProductMapping(map.id)}
                          className="p-1.5 text-[#888888] hover:text-[#D32F2F] hover:bg-red-50 rounded transition-all cursor-pointer inline-flex items-center justify-center hover:scale-[1.08]"
                          title="Delete mapping rule"
                        >
                          <Trash2 size={12} />
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
    </div>
  );
}
