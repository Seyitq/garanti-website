'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiCheck } from 'react-icons/fi';

interface Brand {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  categories: Category[];
  _count: { products: number };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  sortOrder: number;
}

export default function CategoriesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Brand form
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [editBrandId, setEditBrandId] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('');

  // Category form
  const [showCatForm, setShowCatForm] = useState<string | null>(null);
  const [editCatId, setEditCatId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');

  const fetchBrands = async () => {
    const res = await fetch('/api/brands');
    const data = await res.json();
    setBrands(data.brands || []);
    setLoading(false);
  };

  useEffect(() => { fetchBrands(); }, []);

  // Brand CRUD
  const saveBrand = async () => {
    if (!brandName.trim()) return;
    if (editBrandId) {
      await fetch('/api/brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editBrandId, name: brandName }),
      });
    } else {
      await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: brandName }),
      });
    }
    setBrandName('');
    setEditBrandId(null);
    setShowBrandForm(false);
    fetchBrands();
  };

  const deleteBrand = async (id: string) => {
    if (!confirm('Bu markayı ve altındaki tüm kategorileri silmek istediğinize emin misiniz?')) return;
    await fetch('/api/brands', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBrands();
  };

  const startEditBrand = (brand: Brand) => {
    setEditBrandId(brand.id);
    setBrandName(brand.name);
    setShowBrandForm(true);
  };

  // Category CRUD
  const saveCategory = async (brandId: string) => {
    if (!catName.trim()) return;
    if (editCatId) {
      await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editCatId, name: catName }),
      });
    } else {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName, brandId }),
      });
    }
    setCatName('');
    setEditCatId(null);
    setShowCatForm(null);
    fetchBrands();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    await fetch('/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBrands();
  };

  const startEditCategory = (cat: Category) => {
    setEditCatId(cat.id);
    setCatName(cat.name);
    setShowCatForm(cat.brandId);
  };

  if (loading) return <div className="text-center py-12 text-[#6B7280]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Kategoriler</h1>
        <button
          onClick={() => { setShowBrandForm(true); setEditBrandId(null); setBrandName(''); }}
          className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004080] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Yeni Marka
        </button>
      </div>

      {/* Brand Form */}
      {showBrandForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-[#1A1A2E] mb-3">{editBrandId ? 'Marka Düzenle' : 'Yeni Marka'}</h2>
          <div className="flex gap-3">
            <input
              type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)}
              placeholder="Marka adı"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30"
              onKeyDown={(e) => e.key === 'Enter' && saveBrand()}
            />
            <button onClick={saveBrand} className="bg-[#0057A8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#004080] transition-colors">
              <FiCheck className="w-4 h-4" />
            </button>
            <button onClick={() => setShowBrandForm(false)} className="text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-[#1A1A2E]">{brand.name}</h2>
                  <span className="text-xs text-[#6B7280]">{brand._count.products} ürün</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setShowCatForm(brand.id); setEditCatId(null); setCatName(''); }}
                    className="text-xs text-[#0057A8] hover:underline flex items-center gap-1"
                  >
                    <FiPlus className="w-3 h-3" /> Kategori Ekle
                  </button>
                  <button onClick={() => startEditBrand(brand)} className="p-1.5 text-[#0057A8] hover:bg-[#E6F0FA] rounded-lg transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteBrand(brand.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Category add form */}
              {showCatForm === brand.id && (
                <div className="flex gap-3 mb-4">
                  <input
                    type="text" value={catName} onChange={(e) => setCatName(e.target.value)}
                    placeholder="Kategori adı"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30"
                    onKeyDown={(e) => e.key === 'Enter' && saveCategory(brand.id)}
                  />
                  <button onClick={() => saveCategory(brand.id)} className="bg-[#0057A8] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#004080] transition-colors">
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setShowCatForm(null); setEditCatId(null); setCatName(''); }} className="text-[#6B7280] hover:text-[#1A1A2E]">
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {brand.categories.map((cat) => (
                  <div key={cat.id} className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between group">
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">{cat.name}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">/{brand.slug}/{cat.slug}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEditCategory(cat)} className="p-1 text-[#0057A8] hover:bg-[#E6F0FA] rounded transition-colors">
                        <FiEdit2 className="w-3 h-3" />
                      </button>
                      <button onClick={() => deleteCategory(cat.id)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {brand.categories.length === 0 && (
                <p className="text-sm text-[#6B7280] text-center py-4">Henüz kategori eklenmemiş.</p>
              )}
            </div>
          </div>
        ))}

        {brands.length === 0 && (
          <div className="text-center py-12 text-[#6B7280] bg-white rounded-xl border border-gray-100">
            Henüz marka eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
