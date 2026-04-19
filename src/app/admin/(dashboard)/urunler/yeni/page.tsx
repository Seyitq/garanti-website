'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUpload, FiX } from 'react-icons/fi';

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  brand: Brand;
}

export default function NewProductPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    oemCode: '',
    brandId: '',
    categoryId: '',
    description: '',
    compatibleModels: '',
    stockQuantity: 0,
    isFeatured: false,
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => {
        setBrands(d.brands || []);
        setCategories(d.categories || []);
      });
  }, []);

  const filteredCategories = categories.filter((c) => c.brandId === form.brandId);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          setImageUrls((prev) => [...prev, data.url]);
        }
      }
    } catch {
      setError('Resim yüklenemedi.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const images = imageUrls.length > 0
        ? imageUrls.map((url) => ({ url }))
        : [{ url: '/images/products/placeholder.svg' }];

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          specifications: specs.filter((s) => s.key && s.value),
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Ürün eklenemedi.');
        return;
      }

      router.push('/admin/urunler');
      router.refresh();
    } catch {
      setError('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Yeni Ürün Ekle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">{error}</div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-[#1A1A2E]">Temel Bilgiler</h2>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Ürün Adı *</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">OEM Parça Kodu *</label>
            <input
              type="text" required value={form.oemCode}
              onChange={(e) => setForm({ ...form, oemCode: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Marka *</label>
              <select
                required value={form.brandId}
                onChange={(e) => setForm({ ...form, brandId: e.target.value, categoryId: '' })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
              >
                <option value="">Seçiniz</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Kategori *</label>
              <select
                required value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
              >
                <option value="">Seçiniz</option>
                {filteredCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Açıklama</label>
            <textarea
              rows={4} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Uyumlu Modeller (virgülle ayırın)</label>
            <input
              type="text" value={form.compatibleModels}
              onChange={(e) => setForm({ ...form, compatibleModels: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
              placeholder="EC210, EC240, PC200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Stok Adedi</label>
              <input
                type="number" min={0}
                value={form.stockQuantity}
                onChange={(e) => setForm({ ...form, stockQuantity: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#0057A8] focus:ring-[#0057A8]"
                />
                <span className="text-sm text-[#1A1A2E]">Öne Çıkan Ürün</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-[#1A1A2E]">Ürün Görselleri</h2>
          <div className="flex flex-wrap gap-3">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                <Image src={url} alt="Ürün" fill className="object-contain p-1" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#0057A8] transition-colors">
              <FiUpload className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">{uploading ? '...' : 'Ekle'}</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-[#1A1A2E]">Teknik Özellikler</h2>
          {specs.map((spec, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <input
                type="text" placeholder="Özellik adı" value={spec.key}
                onChange={(e) => { const s = [...specs]; s[i].key = e.target.value; setSpecs(s); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30"
              />
              <input
                type="text" placeholder="Değer" value={spec.value}
                onChange={(e) => { const s = [...specs]; s[i].value = e.target.value; setSpecs(s); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSpecs([...specs, { key: '', value: '' }])}
            className="text-sm text-[#0057A8] hover:underline"
          >
            + Özellik Ekle
          </button>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#0057A8] hover:bg-[#004080] disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
        </button>
      </form>
    </div>
  );
}
