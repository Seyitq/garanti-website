import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0057A8] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#1A1A2E] mb-2">Sayfa Bulunamadı</h2>
        <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0057A8] hover:bg-[#004080] text-white font-medium rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/urunler"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-[#1A1A2E] hover:bg-gray-50 font-medium rounded-lg transition-colors"
          >
            Ürünlere Git
          </Link>
        </div>
      </div>
    </div>
  );
}
