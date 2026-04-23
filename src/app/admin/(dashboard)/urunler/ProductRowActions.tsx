'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function ProductRowActions({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${productName}" ürününü silmek istediğinizden emin misiniz?`)) return;

    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Ürün silinemedi.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/urunler/${productId}`}
        className="p-1.5 text-[#6B7280] hover:text-[#0057A8] hover:bg-blue-50 rounded-md transition-colors"
        title="Düzenle"
      >
        <FiEdit2 className="w-4 h-4" />
      </Link>
      <button
        onClick={handleDelete}
        className="p-1.5 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        title="Sil"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
