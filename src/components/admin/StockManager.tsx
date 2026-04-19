'use client';

import { useState } from 'react';
import { getStockInfo } from '@/lib/constants';

interface Product {
  id: string;
  name: string;
  oemCode: string;
  stockQuantity: number;
  brand: { name: string };
  category: { name: string };
}

export default function StockManager({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState<Record<string, number>>({});

  const handleChange = (id: string, quantity: number) => {
    setChanges((prev) => ({ ...prev, [id]: quantity }));
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockQuantity: quantity } : p))
    );
  };

  const saveAll = async () => {
    const updates = Object.entries(changes).map(([id, stockQuantity]) => ({ id, stockQuantity }));
    if (updates.length === 0) return;

    setSaving(true);
    try {
      await fetch('/api/stock', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      setChanges({});
      alert('Stok güncellendi!');
    } catch {
      alert('Hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const changedCount = Object.keys(changes).length;

  return (
    <div>
      {changedCount > 0 && (
        <div className="mb-4 flex items-center justify-between bg-[#0057A8]/10 border border-[#0057A8]/30 rounded-lg p-3">
          <span className="text-sm text-[#0057A8] font-medium">{changedCount} değişiklik bekliyor</span>
          <button
            onClick={saveAll}
            disabled={saving}
            className="bg-[#0057A8] hover:bg-[#004080] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-[#6B7280]">Ürün Adı</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Parça Kodu</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Marka</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Kategori</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Adet</th>
                <th className="px-4 py-3 font-medium text-[#6B7280]">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => {
                const info = getStockInfo(p.stockQuantity);
                return (
                  <tr key={p.id} className={`transition-colors ${changes[p.id] !== undefined ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3 font-medium text-[#1A1A2E]">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{p.oemCode}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{p.brand.name}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{p.category.name}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min={0}
                        value={p.stockQuantity}
                        onChange={(e) => handleChange(p.id, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-20 px-2 py-1.5 text-sm rounded-lg border border-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 text-center"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${info.badgeClass}`}>
                        {info.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
