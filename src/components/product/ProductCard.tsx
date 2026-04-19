import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '@/lib/constants';

interface ProductCardProps {
  name: string;
  slug: string;
  oemCode: string;
  brandName: string;
  brandSlug: string;
  categorySlug: string;
  imageUrl: string;
  stockQuantity: number;
  stockLabel: string;
  stockBadgeClass: string;
}

export default function ProductCard({
  name, slug, oemCode, brandName, brandSlug, categorySlug, imageUrl,
  stockLabel, stockBadgeClass,
}: ProductCardProps) {
  const productUrl = `/urunler/${brandSlug}/${categorySlug}/${slug}`;
  const waUrl = getWhatsAppUrl(name, oemCode);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image */}
      <Link href={productUrl} className="relative aspect-square overflow-hidden bg-[#F8FAFC]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Brand Badge */}
        <span className="absolute top-3 left-3 bg-[#0057A8] text-white text-xs font-medium px-2.5 py-1 rounded-md">
          {brandName}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={productUrl} className="block mb-1">
          <h3 className="font-semibold text-[#1A1A2E] text-sm leading-snug group-hover:text-[#0057A8] transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <p className="text-xs text-[#6B7280] mb-2">Parça Kodu: {oemCode}</p>

        {/* Stock Badge */}
        <div className="mb-3 mt-auto">
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${stockBadgeClass}`}>
            {stockLabel}
          </span>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          <FaWhatsapp className="w-4 h-4" />
          Bilgi Al
        </a>
      </div>
    </div>
  );
}
