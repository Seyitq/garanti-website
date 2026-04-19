'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { useState } from 'react';

interface CatalogFiltersProps {
  brands: { name: string; slug: string }[];
  categories: { name: string; slug: string }[];
  currentBrand?: string;
  currentCategory?: string;
  currentStock?: string;
  currentSort?: string;
  currentQuery?: string;
}

export default function CatalogFilters({
  brands, categories, currentBrand, currentCategory, currentStock, currentSort, currentQuery,
}: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(currentQuery || '');

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/urunler?${params.toString()}`);
  };

  const clearAll = () => {
    router.push('/urunler');
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('q', query || undefined);
  };

  const hasFilters = currentBrand || currentCategory || currentStock || currentQuery;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#1A1A2E]">Filtreler</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-[#0057A8] hover:underline flex items-center gap-1">
            <FiX className="w-3 h-3" /> Temizle
          </button>
        )}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün veya parça kodu ara..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
          />
        </div>
      </form>

      {/* Brand Filter */}
      <div>
        <h3 className="text-sm font-medium text-[#1A1A2E] mb-2">Marka</h3>
        <div className="space-y-1">
          {brands.map((b) => (
            <button
              key={b.slug}
              onClick={() => updateFilter('brand', currentBrand === b.slug ? undefined : b.slug)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                currentBrand === b.slug
                  ? 'bg-[#0057A8] text-white font-medium'
                  : 'text-[#1A1A2E] hover:bg-[#E6F0FA]'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-[#1A1A2E] mb-2">Kategori</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => updateFilter('category', currentCategory === c.slug ? undefined : c.slug)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                currentCategory === c.slug
                  ? 'bg-[#0057A8] text-white font-medium'
                  : 'text-[#1A1A2E] hover:bg-[#E6F0FA]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h3 className="text-sm font-medium text-[#1A1A2E] mb-2">Stok Durumu</h3>
        <div className="space-y-1">
          {[
            { value: 'in_stock', label: 'Stokta Var' },
            { value: 'low_stock', label: 'Az Kaldı' },
            { value: 'out_of_stock', label: 'Stok Dışı' },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => updateFilter('stock', currentStock === s.value ? undefined : s.value)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                currentStock === s.value
                  ? 'bg-[#0057A8] text-white font-medium'
                  : 'text-[#1A1A2E] hover:bg-[#E6F0FA]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium text-[#1A1A2E] mb-2">Sıralama</h3>
        <select
          value={currentSort || 'newest'}
          onChange={(e) => updateFilter('sort', e.target.value === 'newest' ? undefined : e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
        >
          <option value="newest">En Yeni</option>
          <option value="name">İsim (A-Z)</option>
          <option value="code">Parça Kodu</option>
        </select>
      </div>
    </div>
  );
}
