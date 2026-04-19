'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlus, FiTrash2, FiEdit2, FiUpload, FiX, FiCheck } from 'react-icons/fi';

interface ReferenceClient {
  id: string;
  name: string;
  logoUrl: string;
  isActive: boolean;
  sortOrder: number;
}

export default function ReferansFirePage() {
  const [clients, setClients] = useState<ReferenceClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchClients = async () => {
    const res = await fetch('/api/reference-clients');
    const data = await res.json();
    setClients(data.clients || []);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setLogoUrl(data.url);
      }
    } catch { /* ignore */ }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!name || !logoUrl) return;

    if (editId) {
      await fetch('/api/reference-clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, name, logoUrl }),
      });
    } else {
      await fetch('/api/reference-clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, logoUrl }),
      });
    }

    resetForm();
    fetchClients();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu referans firmayı silmek istediğinize emin misiniz?')) return;
    await fetch('/api/reference-clients', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchClients();
  };

  const handleToggleActive = async (client: ReferenceClient) => {
    await fetch('/api/reference-clients', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: client.id, isActive: !client.isActive }),
    });
    fetchClients();
  };

  const startEdit = (client: ReferenceClient) => {
    setEditId(client.id);
    setName(client.name);
    setLogoUrl(client.logoUrl);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setLogoUrl('');
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-12 text-[#6B7280]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Referans Firmalar</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004080] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Yeni Firma
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-[#1A1A2E]">
            {editId ? 'Firma Düzenle' : 'Yeni Firma Ekle'}
          </h2>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Firma Adı *</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8]"
              placeholder="Firma adı"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Logo *</label>
            <div className="flex items-center gap-4">
              {logoUrl && (
                <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  <Image src={logoUrl} alt="Logo" width={64} height={64} className="object-contain w-full h-full p-1" />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm transition-colors">
                <FiUpload className="w-4 h-4" />
                {uploading ? 'Yükleniyor...' : 'Logo Yükle'}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!name || !logoUrl}
              className="bg-[#0057A8] hover:bg-[#004080] text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
            >
              {editId ? 'Güncelle' : 'Kaydet'}
            </button>
            <button onClick={resetForm} className="text-sm text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {clients.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280]">
            Henüz referans firma eklenmemiş.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
                  <Image src={client.logoUrl} alt={client.name} width={48} height={48} className="object-contain w-full h-full p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1A1A2E] truncate">{client.name}</p>
                  <p className="text-xs text-[#6B7280]">
                    {client.isActive ? '✅ Aktif' : '❌ Pasif'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(client)}
                    className={`p-2 rounded-lg text-sm transition-colors ${client.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                    title={client.isActive ? 'Pasife Al' : 'Aktife Al'}
                  >
                    {client.isActive ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                  </button>
                  <button onClick={() => startEdit(client)} className="p-2 text-[#0057A8] hover:bg-[#E6F0FA] rounded-lg transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(client.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
